/**
 * FormControl (stateful)
 * - Provides a field name to all descendants via FormControlContext.
 * - Applies theme defaults.
 */
import React from "react";
import { FormControl as CoreFormControl } from "./core/FormControl";
import { FormControlContext } from "./formControlContext";
import { useFormCtx } from "./useFormCtx";
import type { FormControlProps } from "./types";

export function FormControl({ name, className = "", children, ...rest }: FormControlProps) {
  const ctx: any = useFormCtx();

  return (
    <FormControlContext.Provider value={{ name }}>
      <CoreFormControl
        className={[ctx?.theme?.formControl ?? "", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </CoreFormControl>
    </FormControlContext.Provider>
  );
}
