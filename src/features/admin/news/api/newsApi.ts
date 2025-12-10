import { api } from "@/app/apiSlice";
import type { Category } from "../components/CategoryList";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type CategoriesResponse = ApiResponse<Category[]>;

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
      invalidatesTags: ["Categories"],
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

    // Get all categories
    fetchCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: "/api/admin/categories",
      }),
      providesTags: ["Categories"],
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
  useFetchCategoriesQuery,
} = newsApi;
