import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  categoryFormSchema,
  type CategoryFormInput,
} from "../../validations/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useAddCategoryMutation } from "../../api/newsApi";

const AddCategoryModal = () => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const [serverError, setServerError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormInput) => {
    try {
      console.log(data);
      await addCategory(data).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Add category failed:", error);

      // handle backend error
      setServerError(error?.data?.message || "Failed to add category");

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
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          <Plus size={20} />
          Add Category
        </button>
      </DialogTrigger>
      <DialogContent>
        {/* modal header */}
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to organize items effectively.
          </DialogDescription>
        </DialogHeader>

        {/* add category form */}
        <form id="add-category-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              {/* category field */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter category name"
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
            <Button disabled={isLoading} type="submit" form="add-category-form">
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
