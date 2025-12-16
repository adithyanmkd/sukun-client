import { api } from "@/app/apiSlice";
import type { Category } from "../components/CategoryList";
import type { ApiResponse } from "@/types/api";
import type { NewsSchemaInput } from "../validations/newsSchema";

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
    updateCategory: builder.mutation<
      CategoriesResponse,
      { id: string; data: { name: string } }
    >({
      query: ({ id, data }) => ({
        url: `/api/admin/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["Categories"],
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          newsApi.util.updateQueryData(
            "fetchCategories",
            undefined,
            (draft) => {
              if (!draft.data) return;

              const category = draft.data.find((cat) => cat._id === id);
              if (category) {
                category.name = data.name;
              }
            },
          ),
        );

        try {
          await queryFulfilled; // commit
        } catch {
          patchResult.undo(); // rollback on error
        }
      },
    }),

    // delete category
    deleteCategory: builder.mutation({
      query: ({ _id }) => ({
        url: `/api/admin/categories/${_id}`,
        method: "DELETE",
      }),

      // invalidatesTags: ["Categories"],
      async onQueryStarted(deletedItem, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          newsApi.util.updateQueryData(
            "fetchCategories",
            undefined,
            (draft) => {
              if (draft?.data) {
                draft.data = draft.data.filter(
                  (cat) => cat._id !== deletedItem._id,
                );
              }
            },
          ),
        );

        try {
          await queryFulfilled; // commit
        } catch {
          patchResult.undo(); // rollback if delete fails
        }
      },
    }),

    // Get all categories
    fetchCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: "/api/admin/categories",
      }),
      providesTags: ["Categories"],
    }),

    // -------- NEWS APIs ----------

    // add news
    addNews: builder.mutation<ApiResponse<NewsSchemaInput>, NewsSchemaInput>({
      query: (body) => ({
        url: "/api/admin/news",
        method: "POST",
        body,
      }),
    }),
  }),
  // Prevents overriding existing endpoints in the same API slice
  overrideExisting: false,
});

export const {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,

  useAddNewsMutation,
} = newsApi;
