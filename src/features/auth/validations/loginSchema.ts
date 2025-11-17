import * as z from "zod";

export const loginFormSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept the Terms & Conditions",
  }),
});

// for typescript
export type LoginSchemaInput = z.infer<typeof loginFormSchema>;
