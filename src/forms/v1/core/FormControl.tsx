/**
 * FormControl (core)
 * - Simple block-level wrapper. Theme applied by stateful wrapper.
 */
import React from "react";
import { cn } from "../../utils/cn";

export function FormControl({ className = "", children, ...rest }: any) {
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
