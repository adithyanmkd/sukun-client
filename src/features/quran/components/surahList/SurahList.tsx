import SurahListItem from "./SurahListItem";
import { type Surah } from "../../api/quranApi";

interface SurahListProps {
  data: Surah[];
  onSelect: (s: Surah) => void;
}

export default function SurahList({ data, onSelect }: SurahListProps) {
  return (
    <div className="mt-4 space-y-3">
      {data.map((surah) => (
        <SurahListItem key={surah.id} surah={surah} onSelect={onSelect} />
      ))}
    </div>
  );
}
