import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  sourceFormSchema,
  type SourceFormInput,
} from "../../validations/sourceSchema";
import {
  useFetchSourceQuery,
  useUpdateSourceMutation,
} from "../../api/sourcesApi";

import type { Source } from "../../pages/SourceListPage";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: Source;
};

const EditSourceModal = ({ open, onOpenChange, source }: Props) => {
  const [serverError, setServerError] = useState<string | null>(null);

  // this data is used for checking duplicate
  const { data: sourcesData } = useFetchSourceQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const [updateSource, { isLoading }] = useUpdateSourceMutation();

  const form = useForm<SourceFormInput>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (data: SourceFormInput) => {
    // check duplicate
    const newName = data.name;
    const existingSources = sourcesData?.data || [];

    const isAlreadyExist = existingSources.some(
      (item) => item._id !== source._id && item.name === newName,
    );

    if (isAlreadyExist) {
      setServerError("Source already exists");
      return;
    }

    console.log(data);
    try {
      onOpenChange(false);
      const res = await updateSource({ _id: source._id, ...data }).unwrap();
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const errorMsg = error?.data?.message || "Failed to update source";
      setServerError(errorMsg);

      setTimeout(() => {
        setServerError(null);
      }, 3000);
    }
  };

  const handleReset = () => {
    form.reset();
    setServerError(null);
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setServerError(null);
    }

    if (source) {
      form.reset({
        name: source.name,
        url: source.url,
      });
    }
  }, [open, source, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        {/* add category form */}
        <form id="edit-source-form" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button disabled={isLoading} type="submit" form="edit-source-form">
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSourceModal;
