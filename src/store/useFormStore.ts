import { create } from "zustand";
import type { Step1Type, Step2Type, Step3Type } from "../schemas/stepSchemas";
import { persist } from "zustand/middleware";

type FormData = Partial<Step1Type & Step2Type & Step3Type>;

interface FormState {
  step: number;
  data: FormData | undefined;
  next: (values: FormData) => void;
  back: () => void;
  submit: (values: FormData) => void;
  clear: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      step: 1,

      data: undefined,

      next: (values) => set((state) => ({ step: state.step + 1, data: { ...state.data, ...values } })),

      back: () => set((state) => ({ step: state.step - 1 })),

      submit: (values) => set((state) => ({ data: { ...state.data, ...values } })),

      clear: () => set({ step: 1, data: undefined }),
    }),
    {
      name: "zustand-form-state",
      partialize: (state) => ({ step: state.step, data: state.data }),
    }
  )
);
