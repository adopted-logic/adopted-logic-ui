/**
 * FormLabel (stateful)
 * - Defaults htmlFor from FormControlContext.name if not provided.
 * - Applies theme defaults.
 */
import React from "react";
import { FormLabel as CoreFormLabel } from "./core/FormLabel";
import { useFormControl } from "./formControlContext";
import { useFormCtx } from "./useFormCtx";
import type { FormLabelProps } from "./types";

export function FormLabel({ htmlFor, className = "", children, ...rest }: FormLabelProps) {
  const { name } = useFormControl();
  const ctx: any = useFormCtx();

  return (
    <CoreFormLabel
      htmlFor={htmlFor ?? name}
      className={[ctx?.theme?.label ?? "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </CoreFormLabel>
  );
}
