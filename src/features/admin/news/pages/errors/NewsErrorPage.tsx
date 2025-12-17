import { AlertCircle, RefreshCw } from "lucide-react";

interface NewsErrorPageProps {
  onRetry: () => void;
}

const NewsErrorPage = ({ onRetry }: NewsErrorPageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>

        {/* Error Message */}
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Failed to Load News
        </h2>
        <p className="mb-8 text-gray-600">
          We couldn't fetch the news data. Please check your connection and try
          again.
        </p>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </button>
      </div>
    </div>
  );
};

export default NewsErrorPage;
