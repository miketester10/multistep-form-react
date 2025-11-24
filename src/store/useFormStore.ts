import { create } from "zustand";
import { stepSchema1, stepSchema2, stepSchema3, type Step1Type, type Step2Type, type Step3Type } from "../schemas/stepSchemas";
import { persist } from "zustand/middleware";

const steps = [
  { schema: stepSchema1, fields: ["nome", "cognome", "email"] },
  { schema: stepSchema2, fields: ["indirizzo", "citta", "cap"] },
  { schema: stepSchema3, fields: ["carta", "mese", "anno"] },
] as const;

type FormData = Partial<Step1Type & Step2Type & Step3Type>;

interface FormState {
  currentStepNumber: number;
  totalStepsNumber: number;
  steps: typeof steps;
  data: FormData | undefined;
  next: (values: FormData) => void;
  back: () => void;
  submit: (values: FormData) => void;
  resetFormStore: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      currentStepNumber: 1,

      totalStepsNumber: steps.length,

      steps: steps,

      data: undefined,

      next: (values) => set((state) => ({ currentStepNumber: state.currentStepNumber + 1, data: { ...state.data, ...values } })),

      back: () => set((state) => ({ currentStepNumber: state.currentStepNumber - 1 })),

      submit: (values) => {
        const allData = { ...get().data, ...values };
        alert(JSON.stringify(allData, null, 2));
      },

      resetFormStore: () => set({ currentStepNumber: 1, data: undefined }),
    }),
    {
      name: "zustand-form-state",
      partialize: (state) => ({ currentStepNumber: state.currentStepNumber, data: state.data }),
    }
  )
);
