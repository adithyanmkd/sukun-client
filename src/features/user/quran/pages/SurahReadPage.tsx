import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSurahAyahsQuery,
  useGetSurahsQuery,
  type Surah,
} from "../api/quranApi";
import AyahItem from "../components/read/AyahItem";
import { ArrowLeft } from "lucide-react";

export default function SurahReadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const surahId = Number(id);

  const { data: surahData } = useGetSurahsQuery();
  const surah = surahData?.chapters?.find((s: Surah) => s.id === surahId);

  const { data, isLoading } = useGetSurahAyahsQuery(surahId);

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <header className="mb-6 flex items-start justify-between">
        <button onClick={() => navigate(-1)} aria-label="back">
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="w-full text-center">
          <h1 className="font-serif text-2xl font-bold">
            {surah?.name_arabic}
          </h1>
          <p className="text-sm text-gray-600">
            {surah?.name_simple} • {surah?.translated_name?.name} •{" "}
            {surah?.revelation_place}
          </p>
        </div>

        <div style={{ width: 28 }} />
      </header>

      {surah?.bismillah_pre && (
        <div className="mb-6 text-center">
          <p className="font-arabic text-2xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      )}

      <article className="mushaf mx-auto">
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.verses?.map((ayah: any) => (
          <AyahItem key={ayah.id} ayah={ayah} />
        ))}
      </article>
    </div>
  );
}
