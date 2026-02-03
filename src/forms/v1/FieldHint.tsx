/**
 * FieldHint (stateful) - stub
 */
import React from "react";
import { FieldHint as CoreFieldHint } from "./core/FieldHint";
import { useFormCtx } from "./useFormCtx";
import type { FieldHintProps } from "./types";

export function FieldHint({ className = "", children, ...rest }: FieldHintProps) {
  const ctx: any = useFormCtx();
  return (
    <CoreFieldHint
      className={[ctx?.theme?.hint ?? "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </CoreFieldHint>
  );
}
