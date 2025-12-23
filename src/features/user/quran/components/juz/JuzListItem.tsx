import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JuzListItem({ juz }: { juz: any }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/quran/juz/${juz.juz_number}`)}
      className="hover:bg-muted cursor-pointer rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Juz {juz.juz_number}</h2>
          <p className="text-sm text-gray-500">
            Contains {Object.keys(juz.verse_mapping).length} Surahs
          </p>
        </div>
      </div>
    </Card>
  );
}
