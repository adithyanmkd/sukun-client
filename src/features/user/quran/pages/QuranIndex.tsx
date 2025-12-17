import { useState } from "react";
import { useGetJuzListQuery, useGetSurahsQuery } from "../api/quranApi";
import { useAppSelector } from "@/app/hooks";

import SurahList from "../components/surahList/SurahList";
import TabsFilter from "../components/TabFilter";

import { type Surah } from "../api/quranApi";
import JuzList from "../components/juz/JuzList";

const PAGE_SIZE = 10;

export default function QuranIndex() {
  const {
    data: surahData,
    isLoading: isSuarhLoading,
    isError: isSurahError,
  } = useGetSurahsQuery();

  const {
    data: juzData,
    isLoading: isJuzLoading,
    isError: isJuzError,
  } = useGetJuzListQuery();

  const bookmarks = useAppSelector(
    (state: { bookmarks: { items: number[] } }) => state.bookmarks.items,
  );

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState("surah");

  const surahs: Surah[] = surahData?.chapters ?? [];
  const juzList = juzData?.juzs ?? [];

  let filteredList = [];

  switch (filter) {
    case "bookmark":
      filteredList = surahs.filter((s) => bookmarks.includes(s.id));
      break;
    case "juz":
      filteredList = juzList;
      break;
    case "surah":
      filteredList = surahs;
      break;
  }

  const visibleItems = filteredList.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleSetFilter = (value: string) => {
    if (value === "bookmark" || value === "surah" || value === "juz") {
      setFilter(value as "surah" | "bookmark" | "juz");
    }
    setVisibleCount(PAGE_SIZE);
  };

  // ---------------- LOADING / ERROR ----------------
  if (isSuarhLoading || isJuzLoading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  if (isSurahError || isJuzError) {
    return (
      <div className="py-8 text-center text-red-600">
        Failed to load Quran data. Please try again.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      {/* Tabs to switch between Surah, Bookmark, and Juz views */}
      <TabsFilter filter={filter} setFilter={handleSetFilter} />

      {filteredList.length === 0 ? (
        <div className="py-8 text-center text-gray-600">
          {filter === "bookmark"
            ? "No bookmarked Surahs yet."
            : filter === "juz"
              ? "No Juz data available."
              : "No Surahs found."}
        </div>
      ) : filter === "juz" ? (
        <JuzList data={visibleItems} />
      ) : (
        <SurahList data={visibleItems} />
      )}
      {visibleCount < filteredList.length && (
        <button
          onClick={handleLoadMore}
          className="mt-4 w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
        >
          Load More
        </button>
      )}
    </div>
  );
}
