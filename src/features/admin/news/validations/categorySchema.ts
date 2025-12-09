import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot exceed 100 characters"),
});

// TypeScript type inferred from category form Zod validation schema
export type CategoryFormInput = z.infer<typeof categoryFormSchema>;
