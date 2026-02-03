/**
 * FieldError (stateful) - stub
 */
import React from "react";
import { FieldError as CoreFieldError } from "./core/FieldError";
import { useFormCtx } from "./useFormCtx";
import type { FieldErrorProps } from "./types";

export function FieldError({ className = "", children, ...rest }: FieldErrorProps) {
  const ctx: any = useFormCtx();
  return (
    <CoreFieldError
      className={[ctx?.theme?.error ?? "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </CoreFieldError>
  );
}
