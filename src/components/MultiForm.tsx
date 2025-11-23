import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { stepSchema1, stepSchema2, stepSchema3, type StepValues } from "../schemas/stepSchemas";
import { useFormStore } from "../store/useFormStore";
import { StepFields } from "./StepFields";
import { ProgressBar } from "./ProgressBar";

const steps = [
  {
    schema: stepSchema1,
    fields: ["nome", "cognome", "email"],
  },
  {
    schema: stepSchema2,
    fields: ["indirizzo", "citta", "cap"],
  },
  {
    schema: stepSchema3,
    fields: ["carta", "mese", "anno"],
  },
] as const;

export default function MultiForm() {
  const { step, data, next, back, submit, clear } = useFormStore();

  const index = step - 1;
  const current = steps[index];

  const form = useForm<StepValues>({
    resolver: zodResolver(current.schema),
    defaultValues: data,
  });

  const onSubmit = (values: StepValues) => {
    if (step < 3) {
      next(values);
    } else {
      submit(values);
      clear();
      form.reset({});
      alert(JSON.stringify({ ...data, ...values }, null, 2));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <motion.form key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-2xl shadow-2xl">
        <ProgressBar currentStep={step} totalSteps={3} />

        <StepFields form={form} fields={current.fields} />

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button type="button" onClick={back} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200 cursor-pointer">
              Indietro
            </button>
          )}

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
            {step === 3 ? "Invia" : "Avanti"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
