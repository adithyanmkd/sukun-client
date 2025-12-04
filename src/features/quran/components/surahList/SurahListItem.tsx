import { Card } from "@/components/ui/card";
import { type Surah } from "../../api/quranApi";
import { useNavigate } from "react-router-dom";

interface SurahListItemProps {
  surah: Surah;
}

export default function SurahListItem({ surah }: SurahListItemProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:bg-muted relative cursor-pointer rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md"
      onClick={() => navigate(`/surah/${surah.id}`)}
    >
      <div className="flex items-center justify-between pt-7">
        <div>
          <div className="font-semibold">{surah.name_simple}</div>
          <div className="text-sm text-gray-500">
            {surah.translated_name?.name}
          </div>
        </div>
        <div className="text-right">
          <div className="font-arabic text-lg">{surah.name_arabic}</div>
          <div className="text-sm text-gray-400">
            {surah.verses_count} Ayahs
          </div>
        </div>
      </div>
    </Card>
  );
}
