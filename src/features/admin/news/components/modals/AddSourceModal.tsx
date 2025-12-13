import {
  Dialog,
  DialogClose,
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sourceFormSchema,
  type SourceFormInput,
} from "../../validations/sourceSchema";
import { useAddSourceMutation } from "../../api/sourcesApi";

const AddSourceModal = () => {
  const [addSource, { isLoading }] = useAddSourceMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<SourceFormInput>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (data: SourceFormInput) => {
    try {
      const res = await addSource(data).unwrap();
      setOpen(false);
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setServerError(error?.data?.message || "Add source failed!");
    }
  };

  const handleReset = () => {
    form.reset();
  };

  // clear modal whenever close the modal
  useEffect(() => {
    if (!open) {
      form.reset();
      setServerError(null);
    }
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <div>
            <Plus />
            Add Source
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* modal header */}
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new source to organize items effectively.
          </DialogDescription>
        </DialogHeader>

        {/* add category form */}
        <form id="add-source-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              {/* source name field */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Source Name</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter source name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* source url field */}
              <Controller
                name="url"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Enter URL</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter url"
                      autoComplete="off"
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
            <Button disabled={isLoading} type="submit" form="add-source-form">
              {isLoading ? "Adding..." : "Add Source"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSourceModal;
