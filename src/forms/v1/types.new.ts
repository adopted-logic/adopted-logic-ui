/**
 * Forms (v1) - minimal, pragmatic typings.
 * - Designed for Gary's internal use (flexible, readable, not "type wizardry").
 */

export type FormMode = "controlled" | "managed" | "uncontrolled";
export type FormStateStrategy = "react" | "replace" | "field" | "event";
export type FormValueType = "object" | "primitive";

export interface FormConfig {
  state?: {
    strategy?: FormStateStrategy; // default: "react"
    valueType?: FormValueType;    // default: inferred (assume object)
  };
  theme?: Partial<FormTheme>;
}

/**
 * Tailwind class theme hooks (keep it shallow to avoid Theme Hell).
 * You can expand this later (e.g., { base, variants }) if needed.
 */
export interface FormTheme {
  form: string;
  formControl: string;
  label: string;
  fieldWrapper: string;
  input: string;
  hint: string;
  error: string;
}

export interface FormProps {
  id?: string;
  mode?: FormMode; // default: "managed"
  data?: any;      // controlled: current data; managed: initialData (optional)
  update?: any;    // controlled updater; signature depends on strategy
  onSubmit?: any;
  onSubmitError?: any;
  className?: string;
  config?: FormConfig;
  children: any;
  [key: string]: any;
}

export interface FormControlProps {
  name?: string; // provides name to descendants via context
  className?: string;
  children: any;
  [key: string]: any;
}

export interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children?: any; // renders even when undefined (spacing preserved)
  [key: string]: any;
}

export interface FieldWrapperProps {
  className?: string;
  children: any;
  [key: string]: any;
}

export interface TextInputProps {
  name?: string;         // optional; falls back to FormControlContext.name
  defaultValue?: any;    // when provided, forces uncontrolled field behavior
  className?: string;
  inputClassName?: string; // applied to <input>
  [key: string]: any;    // type, placeholder, etc.
}

export interface FieldHintProps {
  show?: boolean;
  className?: string;
  children?: any;
  [key: string]: any;
}

export interface FieldErrorProps {
  show?: boolean;
  className?: string;
  children?: any;
  [key: string]: any;
}
