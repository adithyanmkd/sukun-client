const NewsCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex flex-col lg:flex-row">
        {/* Image Skeleton */}
        <div className="animate-shimmer h-64 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[200%_100%] lg:h-80 lg:w-96"></div>

        {/* Content Skeleton */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title Skeleton */}
          <div className="mb-4 space-y-3">
            <div className="h-6 w-4/5 rounded bg-gray-200"></div>
            <div className="h-6 w-3/4 rounded bg-gray-200"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-4 grow space-y-2">
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>

          {/* Source and Date Skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-4 w-32 rounded bg-gray-200"></div>
            <div className="h-4 w-4 rounded-full bg-gray-200"></div>
            <div className="h-4 w-28 rounded bg-gray-200"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-32 rounded bg-gray-200"></div>
            <div className="h-10 w-24 rounded bg-gray-200"></div>
            <div className="h-10 w-32 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
