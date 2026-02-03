import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs } from 'react/jsx-runtime';
import { createContext, useState, useMemo, useEffect, useContext, useRef } from 'react';

// src/utils/cn.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function FieldError({ show, className = "", children, ...rest }) {
  if (!show && !children) return null;
  return /* @__PURE__ */ jsx("div", { className: cn(className), ...rest, children });
}
function Form({
  className = "",
  children,
  onSubmit,
  onSubmitError,
  ...rest
}) {
  const formRef = useRef(null);
  const ctx = useFormCtx();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (ctx?.mode === "uncontrolled") {
        const formEl = formRef.current;
        if (!formEl) return;
        const fd = new FormData(formEl);
        const payload = {};
        for (const [key, value] of fd.entries()) {
          payload[key] = value;
        }
        return await onSubmit?.(payload, e);
      }
      return await onSubmit?.(ctx?.data, e);
    } catch (err) {
      return await onSubmitError?.(err, e);
    }
  }
  return /* @__PURE__ */ jsx(
    "form",
    {
      ref: formRef,
      className: cn(ctx?.theme?.form ?? "", className),
      onSubmit: handleSubmit,
      ...rest,
      children
    }
  );
}
var FormContext = createContext({});
var defaultTheme = {
  form: "",
  formControl: "space-y-2",
  label: "block text-sm font-medium",
  fieldWrapper: "rounded-md border border-neutral-300 bg-white px-2 py-1",
  input: "w-full bg-transparent outline-none text-sm py-1",
  hint: "text-xs text-neutral-500",
  error: "text-xs text-red-600"
};
function Form2({
  mode = "managed",
  data,
  update,
  onSubmit,
  onSubmitError,
  className = "",
  config,
  children,
  ...rest
}) {
  const [formData, setFormData] = useState(() => data ?? {});
  const strategy = config?.state?.strategy ?? "react";
  const valueType = config?.state?.valueType;
  const isObjectData = valueType === "primitive" ? false : true;
  const theme = useMemo(() => {
    return { ...defaultTheme, ...config?.theme ?? {} };
  }, [config?.theme]);
  function handleInputChange(e) {
    if (mode === "uncontrolled") return;
    const target = e?.target;
    const name = target?.name;
    const value = target?.type === "checkbox" ? target?.checked : target?.value;
    if (isObjectData && !name) return;
    const currentData = mode === "controlled" ? data : formData;
    const nextData = isObjectData ? { ...currentData ?? {}, [name]: value } : value;
    if (mode === "controlled") {
      if (!update) return;
      if (strategy === "event") return update(e);
      if (strategy === "field") return update(name, value, e);
      if (strategy === "replace") return update(nextData);
      if (isObjectData) return update((prev) => ({ ...prev ?? {}, [name]: value }));
      return update(value);
    }
    if (isObjectData) {
      setFormData((prev) => ({ ...prev ?? {}, [name]: value }));
    } else {
      setFormData(value);
    }
  }
  function handleInputBlur(_e) {
  }
  function handleInputFocus(_e) {
  }
  async function formError() {
  }
  useEffect(() => {
    if (mode === "managed") {
      setFormData(data ?? (isObjectData ? {} : void 0));
    }
  }, [mode, data]);
  return /* @__PURE__ */ jsx(
    FormContext.Provider,
    {
      value: {
        mode,
        data: mode === "controlled" ? data : formData,
        update: mode === "controlled" ? update : setFormData,
        formError,
        handleInputChange,
        handleInputBlur,
        handleInputFocus,
        config,
        theme
      },
      children: /* @__PURE__ */ jsx(
        Form,
        {
          onSubmit,
          onSubmitError,
          className,
          ...rest,
          children
        }
      )
    }
  );
}

// src/forms/v1/useFormCtx.ts
function useFormCtx() {
  return useContext(FormContext);
}
function FieldError2({ className = "", children, ...rest }) {
  const ctx = useFormCtx();
  return /* @__PURE__ */ jsx(
    FieldError,
    {
      className: [ctx?.theme?.error ?? "", className].filter(Boolean).join(" "),
      ...rest,
      children
    }
  );
}
function FieldHint({ show, className = "", children, ...rest }) {
  if (!show && !children) return null;
  return /* @__PURE__ */ jsx("div", { className: cn(className), ...rest, children });
}
function FieldHint2({ className = "", children, ...rest }) {
  const ctx = useFormCtx();
  return /* @__PURE__ */ jsx(
    FieldHint,
    {
      className: [ctx?.theme?.hint ?? "", className].filter(Boolean).join(" "),
      ...rest,
      children
    }
  );
}
function FieldWrapper({ className = "", children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cn(className), ...rest, children });
}
function FieldWrapper2({ className = "", children, ...rest }) {
  const ctx = useFormCtx();
  return /* @__PURE__ */ jsx(
    FieldWrapper,
    {
      className: [ctx?.theme?.fieldWrapper ?? "", className].filter(Boolean).join(" "),
      ...rest,
      children
    }
  );
}
function FormControl({ className = "", children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cn(className), ...rest, children });
}
var FormControlContext = createContext({});
function useFormControl() {
  return useContext(FormControlContext);
}
function FormControl2({ name, className = "", children, ...rest }) {
  const ctx = useFormCtx();
  return /* @__PURE__ */ jsx(FormControlContext.Provider, { value: { name }, children: /* @__PURE__ */ jsx(
    FormControl,
    {
      className: [ctx?.theme?.formControl ?? "", className].filter(Boolean).join(" "),
      ...rest,
      children
    }
  ) });
}
function FormLabel({
  htmlFor,
  required,
  className = "",
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx("label", { htmlFor, className: cn(className), ...rest, children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
    children ?? null,
    required ? /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "*" }) : null
  ] }) });
}
function FormLabel2({ htmlFor, className = "", children, ...rest }) {
  const { name } = useFormControl();
  const ctx = useFormCtx();
  return /* @__PURE__ */ jsx(
    FormLabel,
    {
      htmlFor: htmlFor ?? name,
      className: [ctx?.theme?.label ?? "", className].filter(Boolean).join(" "),
      ...rest,
      children
    }
  );
}
function TextInput({ className = "", ...rest }) {
  return /* @__PURE__ */ jsx("input", { className: cn(className), ...rest });
}
function TextInput2({
  name,
  defaultValue,
  className = "",
  inputClassName = "",
  ...rest
}) {
  const control = useFormControl();
  const ctx = useFormCtx();
  const effectiveName = name ?? control?.name;
  const isUncontrolledField = ctx?.mode === "uncontrolled" || defaultValue !== void 0;
  const value = effectiveName ? ctx?.data?.[effectiveName] : void 0;
  return /* @__PURE__ */ jsx(FieldWrapper2, { className, children: /* @__PURE__ */ jsx(
    TextInput,
    {
      name: effectiveName,
      className: [ctx?.theme?.input ?? "", inputClassName].filter(Boolean).join(" "),
      ...isUncontrolledField ? { defaultValue } : { value: value ?? "" },
      onChange: (e) => {
        rest?.onChange?.(e);
        ctx?.handleInputChange?.(e);
      },
      onBlur: (e) => {
        rest?.onBlur?.(e);
        ctx?.handleInputBlur?.(e);
      },
      onFocus: (e) => {
        rest?.onFocus?.(e);
        ctx?.handleInputFocus?.(e);
      },
      ...rest
    }
  ) });
}

// src/forms/v1/types.ts
var types_exports = {};

export { FieldError2 as FieldError, FieldHint2 as FieldHint, FieldWrapper2 as FieldWrapper, Form2 as Form, FormControl2 as FormControl, FormControlContext, FormLabel2 as FormLabel, TextInput2 as TextInput, types_exports as Types, useFormCtx };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map