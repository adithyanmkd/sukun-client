import { Spinner } from "@/components/ui/spinner";
import { useFetchSourceQuery } from "../api/sourcesApi";
import AddSourceModal from "../components/modals/AddSourceModal";
import SourceList from "../components/SourceList";

export type Source = {
  _id: string;
  name: string;
  url: string;
};

const SourceListPage = () => {
  const { data, isLoading, isError, error } = useFetchSourceQuery();

  // data loading handling
  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3">
        <Spinner className="size-10" />
        <p className="text-sm text-gray-500">Loading sources…</p>
      </div>
    );
  }

  // data error handling
  if (isError) {
    console.log(error);

    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-red-600">
          Failed to load sources
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  const sources = data?.data || [];

  if (!sources || sources.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-gray-700">No source found</p>
        <p className="mt-1 text-sm text-gray-500">
          Create your first source to organize news content.
        </p>
        <div className="mt-4">
          <AddSourceModal />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Source List</h1>
          {/* Add source modal */}
          <AddSourceModal />
        </div>
        <SourceList sources={sources} />
      </div>
    </div>
  );
};

export default SourceListPage;
