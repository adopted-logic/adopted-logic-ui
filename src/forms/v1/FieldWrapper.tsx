/**
 * FieldWrapper (stateful)
 * - Applies theme defaults.
 */
import React from "react";
import { FieldWrapper as CoreFieldWrapper } from "./core/FieldWrapper";
import { useFormCtx } from "./useFormCtx";
import type { FieldWrapperProps } from "./types";

export function FieldWrapper({ className = "", children, ...rest }: FieldWrapperProps) {
  const ctx: any = useFormCtx();

  return (
    <CoreFieldWrapper
      className={[ctx?.theme?.fieldWrapper ?? "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </CoreFieldWrapper>
  );
}
