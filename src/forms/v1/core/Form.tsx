/**
 * Form (core)
 * - Owns the <form> element.
 * - Handles submit for:
 *   - uncontrolled: builds payload from FormData(form)
 *   - managed/controlled: submits ctx.data
 */

import React, { useRef } from "react";
import { cn } from "../../../utils/cn";
import { useFormCtx } from "../useFormCtx";

export function Form({
  className = "",
  children,
  onSubmit,
  onSubmitError,
  ...rest
}: any) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const ctx: any = useFormCtx();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      if (ctx?.mode === "uncontrolled") {
        const formEl = formRef.current;
        if (!formEl) return;

        const fd = new FormData(formEl);
        const payload: any = {};

        for (const [key, value] of fd.entries()) {
          // v1: last value wins
          payload[key] = value;
        }

        return await onSubmit?.(payload, e);
      }

      return await onSubmit?.(ctx?.data, e);
    } catch (err) {
      return await onSubmitError?.(err, e);
    }
  }

  return (
    <form
      ref={formRef}
      className={cn(ctx?.theme?.form ?? "", className)}
      onSubmit={handleSubmit}
      {...rest}
    >
      {children}
    </form>
  );
}
