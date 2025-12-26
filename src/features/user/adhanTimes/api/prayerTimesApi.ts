import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types";

export const prayerTimesApi = createApi({
  reducerPath: "prayerTimesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.aladhan.com/v1/" }),
  endpoints: (builder) => ({
    getPrayerTimesByCity: builder.query<
      ApiResponse,
      { city: string; country: string }
    >({
      query: ({ city, country }) =>
        `timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`,
    }),
  }),
});

export const { useGetPrayerTimesByCityQuery } = prayerTimesApi;
