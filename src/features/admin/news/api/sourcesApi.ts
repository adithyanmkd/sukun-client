import { api } from "@/app/apiSlice";

import type { SourceFormInput } from "../validations/sourceSchema";
import type { ApiResponse } from "./newsApi";
import type { Source } from "../pages/SourceListPage";

type AddSourceRequest = SourceFormInput;
type AddSourceResponse = ApiResponse<Source>;
type FetchSourceResponse = ApiResponse<Source[]>;

export const sourcesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // add source api
    addSource: builder.mutation<AddSourceResponse, AddSourceRequest>({
      query: (data) => ({
        url: "/api/admin/sources",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sources"],
    }),

    // updateSource
    updateSource: builder.mutation<ApiResponse<Source>, Source>({
      query: (body) => ({
        url: `/api/admin/sources/${body._id}`,
        method: "PUT",
        body,
      }),

      // implement optimistic update
      async onQueryStarted(updatedItem, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          sourcesApi.util.updateQueryData("fetchSource", undefined, (draft) => {
            if (draft.data) {
              draft.data = draft.data.map((source) => {
                if (source._id === updatedItem._id) {
                  return { ...source, ...updatedItem };
                }
                return { ...source };
              });
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback if update faild
        }
      },
    }),

    // delete source
    deleteSource: builder.mutation<ApiResponse<Source>, Source>({
      query: (data) => ({
        url: `/api/admin/sources/${data._id}`,
        method: "DELETE",
      }),

      // below code is for optimistic delete
      // above data object is consist of delete item
      async onQueryStarted(deletedItem, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          sourcesApi.util.updateQueryData("fetchSource", undefined, (draft) => {
            if (draft.data) {
              draft.data = draft.data.filter(
                (source) => source._id !== deletedItem._id,
              );
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // rollback if delete faild
        }
      },
    }),

    // fetch sources
    fetchSource: builder.query<FetchSourceResponse, void>({
      query: () => "/api/admin/sources",
      providesTags: ["Sources"],
    }),
  }),

  // Prevents overriding existing endpoints in the same API slice
  overrideExisting: false,
});

export const {
  useAddSourceMutation,
  useFetchSourceQuery,
  useDeleteSourceMutation,
  useUpdateSourceMutation,
} = sourcesApi;
