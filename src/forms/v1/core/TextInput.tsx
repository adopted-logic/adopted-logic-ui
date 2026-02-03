/**
 * TextInput (core)
 * - Just the input element.
 */
import React from "react";
import { cn } from "../../../utils/cn";

export function TextInput({ className = "", ...rest }: any) {
  return <input className={cn(className)} {...rest} />;
}
