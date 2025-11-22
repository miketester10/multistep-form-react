import { z } from "zod";

export const stepSchema1 = z.object({
  nome: z.string().trim().nonempty({ error: "Il nome è obbligatorio" }),
  cognome: z.string().trim().nonempty({ error: "Il cognome è obbligatorio" }),
  email: z.email({ message: "Inserisci un'email valida" }),
});
export type Step1Type = z.infer<typeof stepSchema1>;

export const stepSchema2 = z.object({
  indirizzo: z.string().trim().nonempty({ error: "L'indirizzo è obbligatorio" }),
  citta: z.string().trim().nonempty({ error: "La città è obbligatoria" }),
  cap: z.string().regex(/^[0-9]{5}$/, "Il CAP deve essere formato da 5 cifre"),
});
export type Step2Type = z.infer<typeof stepSchema2>;

export const stepSchema3 = z
  .object({
    carta: z.string().regex(/^\d{16}$/, "La carta deve contenere 16 cifre numeriche"),

    mese: z.string().regex(/^(0[1-9]|1[0-2])$/, "Il mese deve essere compreso tra 01 e 12"),

    anno: z.string().regex(/^\d{4}$/, "L'anno deve contenere 4 cifre"),
  })
  .superRefine(({ mese, anno }, ctx) => {
    // Non fare nulla se mese o anno non sono completi
    if (!mese || !anno || mese.length !== 2 || anno.length !== 4) return;

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // I mesi sono indicizzati da 0
    const currentYear = now.getFullYear();

    const expMonth = Number(mese);
    const expYear = Number(anno);

    if (expYear < currentYear) {
      ctx.addIssue({
        code: "custom",
        message: "Anno di scadenza non valido",
        path: ["anno"],
      });
    } else if (expYear === currentYear && expMonth < currentMonth) {
      ctx.addIssue({
        code: "custom",
        message: "Mese di scadenza non valido",
        path: ["mese"],
      });
    }
  });
export type Step3Type = z.infer<typeof stepSchema3>;

export type StepValues = Step1Type | Step2Type | Step3Type;
