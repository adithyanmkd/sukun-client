import { Card } from "@/components/ui/card";
import { type Surah } from "../../api/quranApi";
import { toggleBookmark } from "@/features/quran/slices/bookmarkSlice";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { Star, StarOff } from "lucide-react";

interface SurahListItemProps {
  surah: Surah;
  onSelect: (s: Surah) => void;
}

export default function SurahListItem({ surah, onSelect }: SurahListItemProps) {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.items);
  const isBookmarked = bookmarks.includes(surah.id);

  let touchStartX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 60) {
      dispatch(toggleBookmark(surah.id));
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleBookmark(surah.id));
  };

  return (
    <Card
      className="hover:bg-muted relative cursor-pointer rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md"
      onClick={() => onSelect(surah)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={handleBookmark}
        className="absolute top-2 right-2 transition-transform duration-200 hover:scale-125"
        aria-label="bookmark"
      >
        {isBookmarked ? (
          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
        ) : (
          <StarOff className="h-5 w-5 text-gray-500" />
        )}
      </button>
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
