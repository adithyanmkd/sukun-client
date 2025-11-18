import { useParams } from "react-router-dom";
import { useGetSurahAyahsQuery, useGetSurahsQuery } from "../api/quranApi";
import AyahItem from "../components/read/AyahItem";
import { ArrowLeft } from "lucide-react";

export default function SurahReadPage() {
  const { id } = useParams();
  const surahId = Number(id);

  const { data: surahData } = useGetSurahsQuery();
  const surah = surahData?.chapters?.find((s: any) => s.id === surahId);

  const { data, isLoading } = useGetSurahAyahsQuery(surahId);

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <header className="mb-4 flex items-center gap-3">
        <button onClick={() => history.back()}>
          <ArrowLeft className="h-6 w-6" />
        </button>

        <h1 className="text-xl font-bold">{surah?.name_simple}</h1>
      </header>

      <div className="space-y-6">
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.verses?.map((ayah: any) => (
          <AyahItem key={ayah.id} ayah={ayah} />
        ))}
      </div>
    </div>
  );
}
