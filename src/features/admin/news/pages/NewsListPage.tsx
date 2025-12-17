import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useFetchNewsQuery } from "../api/newsApi";

import NewsList from "../components/NewsList";
import NewsLoadingSkeleton from "../components/NewsLoadingSkelton";
import AddNewsModal from "../components/modals/AddNewsModal";
import NewsErrorPage from "./errors/NewsErrorPage";

import type { NewsDto } from "../types";
import NewsEmptyState from "../components/NewsEmptyState";

const ListNewsPage = () => {
  // ------------------- api data -------------------
  const {
    data: news,
    isLoading: isNewsLoading,
    error: newsError,
    refetch,
  } = useFetchNewsQuery();

  // ------------------- local state -------------------
  const [showContent, setShowContent] = useState(false);
  const [addNewsOpen, setAddNewsOpen] = useState(false);

  const handleOnEdit = (item: NewsDto) => {
    // edit logic
    console.log(item);
  };

  const handleOnDelete = (id: string) => {
    console.log(id);
    // delete logic
  };

  useEffect(() => {
    if (!isNewsLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);

      return () => clearInterval(timer);
    }
  }, [isNewsLoading]);

  return (
    <ErrorBoundary fallback={<NewsErrorPage onRetry={refetch} />}>
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              News Management
            </h1>
            <AddNewsModal open={addNewsOpen} setOpen={setAddNewsOpen} />
          </div>

          {isNewsLoading || !showContent ? (
            <NewsLoadingSkeleton />
          ) : newsError ? (
            <NewsErrorPage onRetry={refetch} />
          ) : !news || news.length === 0 ? (
            <NewsEmptyState onAddNews={() => setAddNewsOpen(true)} />
          ) : (
            <NewsList
              news={news}
              onEdit={handleOnEdit}
              onDelete={handleOnDelete}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ListNewsPage;
