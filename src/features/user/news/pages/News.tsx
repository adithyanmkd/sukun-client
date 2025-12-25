import { useMinDelay } from "@/hooks/useMinDelay";

import { useFetchNewsQuery } from "@/features/admin/news/api/newsApi";
import NewsCardSkeleton from "../components/NewsSkelton";
import NewsErrorPage from "@/features/admin/news/pages/errors/NewsErrorPage";
import NewsCard from "../components/NewsCard";

const News = () => {
  const {
    data: news,
    isLoading: isNewsLoading,
    error: newsError,
    refetch,
  } = useFetchNewsQuery();

  const showContent = useMinDelay(isNewsLoading, 400);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {isNewsLoading || !showContent ? (
          <div className="flex flex-col gap-y-8">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </div>
        ) : newsError ? (
          <NewsErrorPage onRetry={refetch} />
        ) : !news || news.length === 0 ? (
          <p>empty state component</p>
        ) : (
          news.map((item) => <NewsCard key={item._id} {...item} />)
        )}
      </div>
    </div>
  );
};

export default News;
