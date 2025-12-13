import * as z from "zod";

export const sourceFormSchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot exceed 100 characters"),
  url: z.string().url("Invalid url"),
});

// TypeScript type inferred from source form Zod validation schema
export type SourceFormInput = z.infer<typeof sourceFormSchema>;
