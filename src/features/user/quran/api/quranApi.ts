import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Surah {
  id: number;
  revelation_order: number;
  revelation_place: "makkah" | "madinah";
  bismillah_pre: boolean;

  name_simple: string;
  name_complex: string;
  name_arabic: string;

  verses_count: number;

  pages: [number, number]; // startPage, endPage
  translated_name: {
    language_name: string;
    name: string;
  };

  // extra fields commonly used
  juz_number?: number; // you already use this
}

export const quranApi = createApi({
  reducerPath: "quranApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/qapi",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Surahs
    getSurahs: builder.query<any, void>({
      query: () => "/chapters",
    }),

    // Ayahs
    getSurahAyahs: builder.query({
      query: (id: number) =>
        `/verses/by_chapter/${id}?language=en&fields=text_uthmani`,
    }),

    // Juz
    getJuzList: builder.query<any, void>({
      query: () => "/juzs",
    }),
  }),
});

export const { useGetSurahsQuery, useGetSurahAyahsQuery, useGetJuzListQuery } =
  quranApi;
