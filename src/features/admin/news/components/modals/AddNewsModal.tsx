import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import SelectField from "@/components/common/SelectField";

import { Plus } from "lucide-react";

import {
  newsFormSchema,
  type NewsSchemaInput,
} from "../../validations/newsSchema";

import { useAddNewsMutation, useFetchCategoriesQuery } from "../../api/newsApi";
import { useFetchSourceQuery } from "../../api/sourcesApi";
import UploadImage from "../UploadImage";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

const AddNewsModal = () => {
  // ---------------------- api data ----------------------
  const {
    data: categiries,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useFetchCategoriesQuery();
  const {
    data: sources,
    isLoading: isSourcesLoading,
    error: sourcesError,
  } = useFetchSourceQuery();
  const [addNews] = useAddNewsMutation();

  // ---------------------- local state ----------------------
  const [serverError, setServerError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // ---------------------- form configuration ----------------------
  const form = useForm<NewsSchemaInput>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      sourceId: "",
      readMoreUrl: "",
      imageUrl: "",
    },
  });

  // ---------------------- form submit handler ----------------------
  const onSubmit = async (data: NewsSchemaInput) => {
    try {
      if (!imageFile) {
        form.setError("imageUrl", {
          type: "manual",
          message: "Please upload a news image",
        });
        return;
      }

      setUploading(true);

      const image = {
        url: "",
        public_id: "",
      };

      if (imageFile) {
        const [result] = await uploadToCloudinary({
          files: imageFile,
          folder: "sukun/news",
        });

        image.url = result.url;
        image.public_id = result.publicId;
      }

      const payload = {
        ...data,
        image,
      };

      console.log("FINAL PAYLOAD:", payload);

      const res = await addNews(payload).unwrap();
      console.log(res);
      setOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Add news failed:", error);
      setServerError(error?.data?.message || "Failed to add news");

      setTimeout(() => setServerError(null), 3000);
    } finally {
      setUploading(false);
    }
  };

  // util function for construct options
  const toOptions = <T extends { _id: string; name: string }>(data?: T[]) =>
    data?.map((item) => ({
      id: item._id,
      name: item.name,
    })) ?? [];

  const categoryOptions = toOptions(categiries?.data);
  const sourcesOptions = toOptions(sources?.data);

  // ---------------------- reset form when modal closes ----------------------
  useEffect(() => {
    if (!open) {
      form.reset();
      setImageFile(null);
      setServerError(null);
    }
  }, [open, form]);

  // ---------------------- derived states ----------------------
  const isLoading = isCategoriesLoading || isSourcesLoading;
  const error = categoriesError || sourcesError;
  if (error) {
    console.error(error);
  }

  /* ------------------------------------------------------------------
   * RENDER
   * ------------------------------------------------------------------ */
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error component</p>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          {/* modal trigger button */}
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              <Plus />
              Add News
            </Button>
          </DialogTrigger>

          {/* main content */}
          <DialogContent className="max-h-[90vh] min-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add News</DialogTitle>
              <DialogDescription>
                Add and publish a new news update with essential details.
              </DialogDescription>
            </DialogHeader>

            {/* add news form */}
            <form
              id="add-news-form"
              onSubmit={form.handleSubmit(onSubmit, (error) =>
                console.error("Form error:", error),
              )}
            >
              <FieldGroup>
                <div className="flex w-full gap-6">
                  <div className="flex-1">
                    <FieldSet>
                      <FieldLegend>News Details</FieldLegend>

                      {/* title field */}
                      <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>
                              News Title
                              <span className="-ml-2 text-lg text-red-500">
                                *
                              </span>
                            </FieldLabel>
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

                      {/* ----------- description feild ----------- */}
                      <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="description">
                              News Description
                              <span className="-ml-2 text-lg text-red-500">
                                *
                              </span>
                            </FieldLabel>
                            <Textarea
                              {...field}
                              className="min-h-32"
                              id="description"
                              placeholder="Enter full news content"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldSet>

                    <FieldSet>
                      <FieldLegend className="pt-6">
                        Media & Categorization
                      </FieldLegend>

                      {/* ----------- category select feild ----------- */}
                      <Controller
                        name="categoryId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Select Category
                              <span className="-ml-2 text-lg text-red-500">
                                *
                              </span>
                            </FieldLabel>
                            <SelectField
                              onChange={field.onChange}
                              value={field.value}
                              label="Select news category"
                              data={sourcesOptions}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldSet>
                  </div>

                  <div className="flex-1">
                    <FieldSet>
                      {/* ----------- source select feild ----------- */}
                      <Controller
                        name="sourceId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel>
                              Select Source{" "}
                              <span className="-ml-2 text-lg text-red-500">
                                *
                              </span>
                            </FieldLabel>
                            <SelectField
                              onChange={field.onChange}
                              value={field.value}
                              label="Select news source"
                              data={categoryOptions}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* --------------- read more url field ---------------  */}
                      <Controller
                        name="readMoreUrl"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field>
                            <FieldLabel asChild>
                              <p>
                                Read more URL
                                <span className="-ml-2 text-lg text-red-500">
                                  *
                                </span>
                              </p>
                            </FieldLabel>
                            <Input
                              {...field}
                              value={field.value}
                              placeholder="Enter read more link"
                              autoComplete="off"
                            />

                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <div className="pt-4">
                        <UploadImage
                          onFileSelect={(file) => {
                            setImageFile(file);
                            if (file) {
                              form.clearErrors("imageUrl");
                            }
                          }}
                        />

                        {form.formState.errors.imageUrl && (
                          <p className="mt-1 text-sm text-red-500">
                            {form.formState.errors.imageUrl.message}
                          </p>
                        )}
                      </div>
                    </FieldSet>
                  </div>
                </div>
                {/* show server error */}
                {serverError && (
                  <p className="text-sm text-red-500">{serverError}</p>
                )}
              </FieldGroup>
            </form>

            {/* modal footer */}
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button
                  onClick={() => form.reset()}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button disabled={uploading} type="submit" form="add-news-form">
                {uploading ? (
                  <span className="flex items-center gap-2">
                    Uploading
                    <Spinner />
                  </span>
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AddNewsModal;
