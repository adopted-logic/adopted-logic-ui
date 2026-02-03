/**
 * FormLabel (core)
 * - Renders even with no children (spacing preserved).
 */
import React from "react";
import { cn } from "../../../utils/cn";

export function FormLabel({
  htmlFor,
  required,
  className = "",
  children,
  ...rest
}: any) {
  return (
    <label htmlFor={htmlFor} className={cn(className)} {...rest}>
      <span className="inline-flex items-center gap-1">
        {children ?? null}
        {required ? <span aria-hidden="true">*</span> : null}
      </span>
    </label>
  );
}
