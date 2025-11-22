import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface StepFieldsProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: readonly Path<T>[];
}

export function StepFields<T extends FieldValues>({ form, fields }: StepFieldsProps<T>) {
  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label className="font-medium capitalize">{field}</label>
          <input className="border p-2 rounded" {...form.register(field)} />

          {form.formState.errors[field] && <p className="text-red-500 text-sm">{String(form.formState.errors[field].message)}</p>}
        </div>
      ))}
    </>
  );
}
