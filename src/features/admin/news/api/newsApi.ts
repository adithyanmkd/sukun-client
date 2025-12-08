import { api } from "@/app/apiSlice";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // -------- CATEGORY APIs ----------

    // create a new category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/api/admin/categories",
        method: "POST",
        body: data,
      }),
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admin/categories/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete category
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/api/admin/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),

  // -------- NEWS APIs ----------

  // Prevents overriding existing endpoints in the same API slice
  overrideExisting: false,
});

export const {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = newsApi;
