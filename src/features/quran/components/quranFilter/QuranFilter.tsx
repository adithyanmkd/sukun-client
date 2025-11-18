interface QuranFilterProps {
  filter: string;
  setFilter: (f: string) => void;
}

export default function QuranFilter({ filter, setFilter }: QuranFilterProps) {
  return (
    <div className="my-4 flex gap-3">
      <button
        className={`rounded px-4 py-2 ${filter === "surah" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("surah")}
      >
        Surah
      </button>

      <button
        className={`rounded px-4 py-2 ${filter === "juz" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("juz")}
      >
        Juz
      </button>

      <button
        className={`rounded px-4 py-2 ${filter === "bookmark" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("bookmark")}
      >
        Bookmarks
      </button>
    </div>
  );
}
