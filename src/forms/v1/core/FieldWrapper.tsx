/**
 * FieldWrapper (core)
 * - Provides the bordered container around an input.
 * - Later you can add slots for addons, icons, inline buttons, etc.
 */
import React from "react";
import { cn } from "../../../utils/cn";

export function FieldWrapper({ className = "", children, ...rest }: any) {
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
