import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-z_]+$/, "Only letters, numbers, and underscores are allowed")
    .refine((val) => !val.startsWith("_"), {
      message: "Username cannot start with an underscore",
    })
    .refine((val) => !val.endsWith("_"), {
      message: "Username cannot end with an underscore",
    })
    .refine((val) => !val.includes("__"), {
      message: "Username cannot contain consecutive underscores",
    }),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),

  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms & Conditions",
  }),
});

// for typescript
export type RegisterSchema = z.infer<typeof registerSchema>;
