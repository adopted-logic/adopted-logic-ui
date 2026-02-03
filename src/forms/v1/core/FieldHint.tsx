/**
 * FieldHint (core) - stub
 */
import React from "react";
import { cn } from "../../../utils/cn";

export function FieldHint({ show, className = "", children, ...rest }: any) {
  if (!show && !children) return null;
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
