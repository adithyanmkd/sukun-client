const NewsLoadingSkeleton = () => {
  return (
    <>
      {/* Skeleton Loading Rows */}
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div
          key={item}
          className="grid animate-pulse grid-cols-[80px_minmax(300px,1fr)_150px_180px_150px_140px] items-center gap-4 border-b border-gray-100 px-6 py-5"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* ID Skeleton */}
          <div className="h-5 w-8 rounded bg-gray-200"></div>

          {/* Title Skeleton - varying widths */}
          <div
            className="h-5 rounded bg-gray-200"
            style={{ width: `${65 + index * 5}%` }}
          ></div>

          {/* Category Skeleton */}
          <div className="h-5 w-28 rounded bg-gray-200"></div>

          {/* Source Skeleton */}
          <div className="h-5 w-32 rounded bg-gray-200"></div>

          {/* Actions Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-blue-100"></div>
            <div className="h-8 w-8 rounded bg-blue-100"></div>
            <div className="h-8 w-8 rounded bg-red-100"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewsLoadingSkeleton;
