import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RecentlyReadItem } from "../api/quranApi";

interface RecentlyReadCardProps {
  item: RecentlyReadItem | null;
  onContinue?: () => void;
}

export default function RecentlyReadCard({
  item,
  onContinue,
}: RecentlyReadCardProps) {
  if (!item) return null;

  return (
    <Card className="mb-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{item.surahName}</div>
          <div className="text-sm text-gray-500">Ayah {item.ayah}</div>
        </div>

        <Button onClick={onContinue}>Continue</Button>
      </div>
    </Card>
  );
}
