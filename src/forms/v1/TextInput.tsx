/**
 * TextInput (stateful)
 * - Wraps itself in FieldWrapper
 * - If name not provided, uses FormControlContext.name
 * - Respects:
 *   - form mode (controlled/managed/uncontrolled)
 *   - per-field defaultValue forces uncontrolled input
 */
import React from "react";
import { TextInput as CoreTextInput } from "./core/TextInput";
import { FieldWrapper } from "./FieldWrapper";
import { useFormControl } from "./formControlContext";
import { useFormCtx } from "./useFormCtx";
import type { TextInputProps } from "./types";

export function TextInput({
  name,
  defaultValue,
  className = "",
  inputClassName = "",
  ...rest
}: TextInputProps) {
  const control = useFormControl();
  const ctx: any = useFormCtx();

  const effectiveName = name ?? control?.name;

  // Field-level uncontrolled override:
  const isUncontrolledField = ctx?.mode === "uncontrolled" || defaultValue !== undefined;

  const value = effectiveName ? ctx?.data?.[effectiveName] : undefined;

  return (
    <FieldWrapper className={className}>
      <CoreTextInput
        name={effectiveName}
        className={[ctx?.theme?.input ?? "", inputClassName].filter(Boolean).join(" ")}
        {...(isUncontrolledField
          ? { defaultValue }
          : { value: value ?? "" })}
        onChange={(e: any) => {
          rest?.onChange?.(e);
          ctx?.handleInputChange?.(e);
        }}
        onBlur={(e: any) => {
          rest?.onBlur?.(e);
          ctx?.handleInputBlur?.(e);
        }}
        onFocus={(e: any) => {
          rest?.onFocus?.(e);
          ctx?.handleInputFocus?.(e);
        }}
        {...rest}
      />
    </FieldWrapper>
  );
}
