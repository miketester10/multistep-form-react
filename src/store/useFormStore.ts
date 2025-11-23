import { create } from "zustand";
import type { Step1Type, Step2Type, Step3Type } from "../schemas/stepSchemas";
import { persist } from "zustand/middleware";

type FormData = Partial<Step1Type & Step2Type & Step3Type>;

interface FormState {
  currentStepNumber: number;
  data: FormData | undefined;
  next: (values: FormData) => void;
  back: () => void;
  submit: (values: FormData) => void;
  clear: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      currentStepNumber: 1,

      data: undefined,

      next: (values) => set((state) => ({ currentStepNumber: state.currentStepNumber + 1, data: { ...state.data, ...values } })),

      back: () => set((state) => ({ currentStepNumber: state.currentStepNumber - 1 })),

      submit: (values) => set((state) => ({ data: { ...state.data, ...values } })),

      clear: () => set({ currentStepNumber: 1, data: undefined }),
    }),
    {
      name: "zustand-form-state",
      partialize: (state) => ({ currentStepNumber: state.currentStepNumber, data: state.data }),
    }
  )
);
