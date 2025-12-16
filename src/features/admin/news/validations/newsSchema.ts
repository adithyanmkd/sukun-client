import * as z from "zod";

export const newsFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),
  categoryId: z.string().min(1, "Category is required"),
  sourceId: z.string().min(1, "Source is required"),
  readMoreUrl: z
    .string()
    .url("Invalid url")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname.includes(".");
      } catch {
        return false;
      }
    }),
  imageUrl: z
    .string()
    .url("Please upload a valid image")
    .optional()
    .or(z.literal("")),
});

// for typescript
export type NewsSchemaInput = z.infer<typeof newsFormSchema>;
