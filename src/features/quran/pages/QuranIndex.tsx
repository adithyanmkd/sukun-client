import { useState } from "react";

import { useGetSurahsQuery } from "../api/quranApi";
import { useDispatch, useSelector } from "react-redux";
import { setRecentlyRead } from "../slices/readerSlice";
import RecentlyReadCard from "../components/RecentlyReadCard";
import SurahList from "../components/surahList/SurahList";
import JuzList from "../components/juz/JuzList";
import TabsFilter from "../components/TabFilter";
import {
  type Surah,
  type RecentlyReadItem,
  useGetJuzListQuery,
} from "../api/quranApi";

export default function QuranIndex() {
  const { data, isLoading } = useGetSurahsQuery();
  const { data: juzData } = useGetJuzListQuery();

  const dispatch = useDispatch();
  const recentlyRead = useSelector(
    (state: { reader: { recentlyRead: RecentlyReadItem | null } }) =>
      state.reader.recentlyRead,
  );

  const bookmarks = useSelector(
    (state: { bookmarks: { items: number[] } }) => state.bookmarks.items,
  );

  const [visibleCount, setVisibleCount] = useState(10);
  const [filter, setFilter] = useState("surah");

  const surahs: Surah[] = data?.chapters ?? [];

  let filteredList = surahs;

  if (filter === "surah") {
    filteredList = surahs;
  }

  if (filter === "juz") filteredList = juzData?.juzs ?? [];

  if (filter === "bookmark") {
    filteredList = surahs.filter((s) => bookmarks.includes(s.id));
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  function handleSelectSurah(surah: Surah) {
    dispatch(
      setRecentlyRead({
        surahId: surah.id,
        surahName: surah.name_simple,
        ayah: 1,
        progress: 0,
      }),
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      {/* Global Quran Progress */}
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Your Quran Progress</h2>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-yellow-500 transition-all"
            style={{ width: `${recentlyRead?.progress || 0}%` }}
          ></div>
        </div>
        <div className="mt-1 text-sm text-gray-600">
          {recentlyRead?.progress || 0}% completed
        </div>
      </div>
      <RecentlyReadCard item={recentlyRead} onContinue={() => {}} />

      <TabsFilter filter={filter} setFilter={setFilter} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filter === "juz" ? (
            <JuzList data={filteredList.slice(0, visibleCount)} />
          ) : (
            <SurahList
              data={filteredList.slice(0, visibleCount)}
              onSelect={handleSelectSurah}
            />
          )}
          {visibleCount < filteredList.length && (
            <button
              onClick={handleLoadMore}
              className="mt-4 w-full rounded-lg bg-green-600 py-2 text-white hover:bg-green-700"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}
