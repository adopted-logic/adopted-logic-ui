import { createContext, useContext } from "react";

export type FormControlContextValue = {
  name?: string;
};

export const FormControlContext = createContext<FormControlContextValue>({});

export function useFormControl() {
  return useContext(FormControlContext);
}
