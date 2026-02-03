import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';

/**
 * Forms (v1) - minimal, pragmatic typings.
 * - Designed for Gary's internal use (flexible, readable, not "type wizardry").
 */
type FormMode = "controlled" | "managed" | "uncontrolled";
type FormStateStrategy = "react" | "replace" | "field" | "event";
type FormValueType = "object" | "primitive";
interface FormConfig {
    state?: {
        strategy?: FormStateStrategy;
        valueType?: FormValueType;
    };
    theme?: Partial<FormTheme>;
}
/**
 * Tailwind class theme hooks (keep it shallow to avoid Theme Hell).
 * You can expand this later (e.g., { base, variants }) if needed.
 */
interface FormTheme {
    form: string;
    formControl: string;
    label: string;
    fieldWrapper: string;
    input: string;
    hint: string;
    error: string;
}
interface FormProps {
    id?: string;
    mode?: FormMode;
    data?: any;
    update?: any;
    onSubmit?: any;
    onSubmitError?: any;
    className?: string;
    config?: FormConfig;
    children: any;
    [key: string]: any;
}
interface FormControlProps {
    name?: string;
    className?: string;
    children: any;
    [key: string]: any;
}
interface FormLabelProps {
    htmlFor?: string;
    required?: boolean;
    className?: string;
    children?: any;
    [key: string]: any;
}
interface FieldWrapperProps {
    className?: string;
    children: any;
    [key: string]: any;
}
interface TextInputProps {
    name?: string;
    defaultValue?: any;
    className?: string;
    inputClassName?: string;
    [key: string]: any;
}
interface FieldHintProps {
    show?: boolean;
    className?: string;
    children?: any;
    [key: string]: any;
}
interface FieldErrorProps {
    show?: boolean;
    className?: string;
    children?: any;
    [key: string]: any;
}

type types_FieldErrorProps = FieldErrorProps;
type types_FieldHintProps = FieldHintProps;
type types_FieldWrapperProps = FieldWrapperProps;
type types_FormConfig = FormConfig;
type types_FormControlProps = FormControlProps;
type types_FormLabelProps = FormLabelProps;
type types_FormMode = FormMode;
type types_FormProps = FormProps;
type types_FormStateStrategy = FormStateStrategy;
type types_FormTheme = FormTheme;
type types_FormValueType = FormValueType;
type types_TextInputProps = TextInputProps;
declare namespace types {
  export type { types_FieldErrorProps as FieldErrorProps, types_FieldHintProps as FieldHintProps, types_FieldWrapperProps as FieldWrapperProps, types_FormConfig as FormConfig, types_FormControlProps as FormControlProps, types_FormLabelProps as FormLabelProps, types_FormMode as FormMode, types_FormProps as FormProps, types_FormStateStrategy as FormStateStrategy, types_FormTheme as FormTheme, types_FormValueType as FormValueType, types_TextInputProps as TextInputProps };
}

declare function FieldError({ className, children, ...rest }: FieldErrorProps): react_jsx_runtime.JSX.Element;

declare function FieldHint({ className, children, ...rest }: FieldHintProps): react_jsx_runtime.JSX.Element;

declare function FieldWrapper({ className, children, ...rest }: FieldWrapperProps): react_jsx_runtime.JSX.Element;

declare function Form({ mode, data, update, onSubmit, onSubmitError, className, config, children, ...rest }: FormProps): react_jsx_runtime.JSX.Element;

declare function FormControl({ name, className, children, ...rest }: FormControlProps): react_jsx_runtime.JSX.Element;

type FormControlContextValue = {
    name?: string;
};
declare const FormControlContext: react.Context<FormControlContextValue>;

declare function FormLabel({ htmlFor, className, children, ...rest }: FormLabelProps): react_jsx_runtime.JSX.Element;

declare function TextInput({ name, defaultValue, className, inputClassName, ...rest }: TextInputProps): react_jsx_runtime.JSX.Element;

declare function useFormCtx(): any;

export { FieldError, FieldHint, FieldWrapper, Form, FormControl, FormControlContext, FormLabel, TextInput, types as Types, useFormCtx };
