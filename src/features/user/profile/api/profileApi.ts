import { api } from "@/app/apiSlice";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get cloudinary signature from backend
    getCloudinarySignature: builder.query({
      query: () => `${import.meta.env.VITE_API_URL}/cloudinary/signature`,
    }),

    // update avatar
    updateAvatar: builder.mutation({
      query: (body) => ({
        url: "/avatar",
        method: "PATCH",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useGetCloudinarySignatureQuery, useUpdateAvatarMutation } =
  profileApi;
