import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetJuzListQuery, useGetSurahsQuery } from "../api/quranApi";
import JuzSurahSection from "../components/juz/JuzSurahSection";
import { ArrowLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function JuzReadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const juzNumber = Number(id);

  const { data: juzData, isLoading: isJuzLoading } = useGetJuzListQuery();
  const { data: surahData } = useGetSurahsQuery();

  if (isJuzLoading) return <p className="p-4">Loading...</p>;

  const juz = juzData?.juzs?.find(
    (j: any) => Number(j.juz_number) === juzNumber,
  );
  if (!juz) return <div className="p-4 text-center">Juz not found.</div>;

  const surahs: any[] = surahData?.chapters ?? [];

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/quran">Quran</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Juz {juz.juz_number}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <header className="mb-6 flex items-start justify-between">
        <button
          onClick={() => navigate("/quran", { state: { filter: "juz" } })}
          aria-label="back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="w-full text-center">
          <h1 className="text-2xl font-bold">Juz {juz.juz_number}</h1>
          <p className="text-sm text-gray-600">
            Contains {Object.keys(juz.verse_mapping ?? {}).length} Surahs
          </p>
        </div>

        <div style={{ width: 28 }} />
      </header>

      <article className="mushaf mx-auto">
        {Object.entries(juz.verse_mapping ?? {}).map(
          ([surahId, mapping]: any) => {
            const surahMeta = surahs.find(
              (s: any) => Number(s.id) === Number(surahId),
            );
            return (
              <JuzSurahSection
                key={surahId}
                surahId={Number(surahId)}
                range={mapping}
                surah={surahMeta}
              />
            );
          },
        )}
      </article>
    </div>
  );
}
