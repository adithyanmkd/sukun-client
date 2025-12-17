import { FileText, Plus } from "lucide-react";

interface NewsEmptyStateProps {
  onAddNews: () => void;
}

const NewsEmptyState: React.FC<NewsEmptyStateProps> = ({ onAddNews }) => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md text-center">
        {/* Empty Icon */}
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <FileText className="h-10 w-10 text-gray-400" />
        </div>

        {/* Empty Message */}
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          No News Available
        </h2>
        <p className="mb-8 text-gray-600">
          You haven't added any news yet. Get started by creating your first
          news article.
        </p>

        {/* Add News Button */}
        <button
          onClick={onAddNews}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add News
        </button>
      </div>
    </div>
  );
};

export default NewsEmptyState;
