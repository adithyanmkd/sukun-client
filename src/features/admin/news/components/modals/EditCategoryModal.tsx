import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import type { Category } from "../CategoryList";
import { Controller, useForm } from "react-hook-form";
import {
  categoryFormSchema,
  type CategoryFormInput,
} from "../../validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUpdateCategoryMutation } from "../../api/newsApi";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Category;
};

const EditCategoryModal = ({ open, onOpenChange, item }: Props) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      const id = item._id;
      await updateCategory({ id, data: { name: data.name } }).unwrap();
      onOpenChange(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Update category failed:", error);
      setServerError(error?.data?.message || "Failed to update category");

      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };

  const handleReset = () => {
    form.reset();
    setServerError(null);
  };

  // Clear the form whenever the modal closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setServerError(null);
    }

    if (item) {
      form.reset({
        name: item.name,
      });
    }
  }, [form, open, form.reset, item]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form id="edit-category-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            {/* category field */}
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter category name"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/* show server error */}
              {serverError && (
                <p className="text-sm text-red-500">{serverError}</p>
              )}
            </FieldGroup>
          </FieldSet>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleReset} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Field orientation="horizontal">
            <Button
              disabled={isLoading}
              type="submit"
              form="edit-category-form"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
