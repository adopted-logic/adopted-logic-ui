/**
 * Form (stateful wrapper/provider)
 * - Provides a single place to interpret mode + state strategy.
 * - Inputs call ctx.handleInputChange; submit handled by core/Form.
 */

import { useEffect, useMemo, useState, createContext } from "react";
import { Form as CoreForm } from "./core/Form";
import type { FormProps, FormStateStrategy, FormValueType, FormTheme } from "./types";

export const FormContext = createContext<any>({});

const defaultTheme: FormTheme = {
  form: "",
  formControl: "space-y-2",
  label: "block text-sm font-medium",
  fieldWrapper: "rounded-md border border-neutral-300 bg-white px-2 py-1",
  input: "w-full bg-transparent outline-none text-sm py-1",
  hint: "text-xs text-neutral-500",
  error: "text-xs text-red-600",
};

export default function Form({
  mode = "managed",
  data,
  update,
  onSubmit,
  onSubmitError,
  className = "",
  config,
  children,
  ...rest
}: FormProps) {
  // Most of your forms are object-shaped; keep merges safe.
  const [formData, setFormData] = useState<any>(() => data ?? {});

  const strategy: FormStateStrategy = config?.state?.strategy ?? "react";
  const valueType: FormValueType | undefined = config?.state?.valueType;

  // Inference: assume object unless explicitly primitive
  const isObjectData = valueType === "primitive" ? false : true;

  const theme = useMemo(() => {
    return { ...defaultTheme, ...(config?.theme ?? {}) };
  }, [config?.theme]);

  function handleInputChange(e: any) {
    if (mode === "uncontrolled") return;

    const target = e?.target;
    const name = target?.name;
    const value = target?.type === "checkbox" ? target?.checked : target?.value;

    if (isObjectData && !name) return;

    const currentData = mode === "controlled" ? data : formData;
    const nextData = isObjectData ? { ...(currentData ?? {}), [name]: value } : value;

    if (mode === "controlled") {
      if (!update) return;

      if (strategy === "event") return update(e);
      if (strategy === "field") return update(name, value, e);
      if (strategy === "replace") return update(nextData);

      // strategy === "react"
      if (isObjectData) return update((prev: any) => ({ ...(prev ?? {}), [name]: value }));
      return update(value);
    }

    // managed mode: internal state updates
    if (isObjectData) {
      setFormData((prev: any) => ({ ...(prev ?? {}), [name]: value }));
    } else {
      setFormData(value);
    }
  }

  function handleInputBlur(_e: any) {}
  function handleInputFocus(_e: any) {}
  async function formError() {}

  useEffect(() => {
    if (mode === "managed") {
      setFormData(data ?? (isObjectData ? {} : undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, data]);

  return (
    <FormContext.Provider
      value={{
        mode,
        data: mode === "controlled" ? data : formData,
        update: mode === "controlled" ? update : setFormData,
        formError,
        handleInputChange,
        handleInputBlur,
        handleInputFocus,
        config,
        theme,
      }}
    >
      <CoreForm
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        className={className}
        {...rest}
      >
        {children}
      </CoreForm>
    </FormContext.Provider>
  );
}
