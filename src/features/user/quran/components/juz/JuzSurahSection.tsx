import AyahItem from "../read/AyahItem";
import { useGetSurahAyahsQuery } from "../../api/quranApi";
import type { Surah } from "../../api/quranApi";

function parseRange(range: any) {
  if (Array.isArray(range)) {
    return { start: Number(range[0]), end: Number(range[1]) };
  }

  if (typeof range === "object" && range !== null) {
    const start =
      range.start_verse ??
      range.start ??
      range.from ??
      range.verse_start ??
      range.ayah_start;
    const end =
      range.end_verse ??
      range.end ??
      range.to ??
      range.verse_end ??
      range.ayah_end;
    return {
      start: start ? Number(start) : undefined,
      end: end ? Number(end) : undefined,
    };
  }

  // fallback - single verse number
  const n = Number(range);
  if (!Number.isNaN(n)) return { start: n, end: n };

  return { start: undefined, end: undefined };
}

export default function JuzSurahSection({
  surahId,
  range,
  surah,
}: {
  surahId: number;
  range: any;
  surah?: Surah | undefined;
}) {
  const { data, isLoading } = useGetSurahAyahsQuery(surahId);

  const { start, end } = parseRange(range);

  if (isLoading) return <div className="py-4">Loading section...</div>;

  const verses = data?.verses ?? [];

  const filtered = verses.filter((v: any) => {
    const num = v.verse_number ?? v.verse ?? v.id;
    if (start && end) return num >= start && num <= end;
    if (start) return num >= start;
    return true;
  });

  return (
    <section className="mb-6">
      <h3 className="surah-heading mb-2 text-right text-lg font-semibold">
        {surah?.name_arabic ?? surah?.name_simple ?? `Surah ${surahId}`}
      </h3>

      {filtered.map((ayah: any) => (
        <AyahItem key={`${surahId}-${ayah.id}`} ayah={ayah} />
      ))}
    </section>
  );
}
