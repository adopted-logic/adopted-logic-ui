import { useContext } from "react";
import { FormContext } from "./Form";

export function useFormCtx(): any {
  return useContext(FormContext);
}
