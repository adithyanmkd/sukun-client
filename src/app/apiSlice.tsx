import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

export interface User {
  _id: string;
  name: string;
  username: string;
  googleId?: string;
  avatar?: string;
}

// base url
let url;

const env = import.meta.env;
const mode = env.VITE_MODE;
if (mode === "development") {
  url = env.VITE_API_URL;
} else {
  url = env.VITE_DEV_TUNNEL_URL;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Categories", "Sources", "News"],
  endpoints: () => ({}),
});
