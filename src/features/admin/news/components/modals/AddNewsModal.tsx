import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import {
  newsFormSchema,
  type NewsSchemaInput,
} from "../../validations/newsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const AddNewsModal = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<NewsSchemaInput>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: NewsSchemaInput) => {
    console.log(data);
    try {
      // api call
      throw new Error("fake error");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Add news failed:", error);
      setServerError(error?.data?.message || "Failed to add news");

      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };

  // Clear the form whenever the modal closes
  useEffect(() => {
    if (!open) {
      form.reset();
      setServerError(null);
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* modal trigger button */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          <Plus />
          Add News
        </Button>
      </DialogTrigger>

      {/* main content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add News</DialogTitle>
          <DialogDescription>
            Add and publish a new news update with essential details.
          </DialogDescription>
        </DialogHeader>

        {/* add news form */}
        <form id="add-news-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                {/* title field */}
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>News Title</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter new title"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* description feild */}
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="description">
                        News Description
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="description"
                        rows={4}
                        placeholder="Enter full news content"
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
          </FieldGroup>
        </form>

        {/* modal footer */}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => form.reset()}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>
          <Field orientation="horizontal">
            <Button type="submit" form="add-news-form">
              Add
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewsModal;
