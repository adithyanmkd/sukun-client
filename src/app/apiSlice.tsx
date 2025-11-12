import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// base url
const url = import.meta.env.VITE_API_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: () => ({}),
});
