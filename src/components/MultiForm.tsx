import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { type StepValues } from "../schemas/stepSchemas";
import { useFormStore, type FormData } from "../store/useFormStore";
import { StepFields } from "./StepFields";
import { ProgressBar } from "./ProgressBar";

export default function MultiForm() {
  const { currentStepNumber, totalStepsNumber, steps, data, next, back, submit, resetFormStore } = useFormStore();

  const index = currentStepNumber - 1;
  const currentStep = steps[index];

  const form = useForm<StepValues>({
    resolver: zodResolver(currentStep.schema),
    defaultValues: data,
  });

  const onSubmit = (values: StepValues) => {
    if (currentStepNumber < totalStepsNumber) {
      next(values);
    } else {
      submit(values);
      // Resetta lo store
      resetFormStore();
      // Resetta tutti i campi di tutti gli step del react-hook-form
      const allFields = steps.flatMap((step) => step.fields);
      const emptyFormValues = allFields.reduce((acc, field) => {
        acc[field] = undefined;
        return acc;
      }, {} as FormData);
      form.reset(emptyFormValues);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <motion.form
        key={currentStepNumber}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-2xl"
      >
        <ProgressBar currentStep={currentStepNumber} totalSteps={totalStepsNumber} />

        <StepFields form={form} fields={currentStep.fields} />

        <div className="flex justify-between mt-4">
          {currentStepNumber > 1 && (
            <button type="button" onClick={back} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200 cursor-pointer">
              Indietro
            </button>
          )}

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
            {currentStepNumber === totalStepsNumber ? "Invia" : "Avanti"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
