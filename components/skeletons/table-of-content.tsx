export function TableOfContentSkeleton() {
  return (
    <div className="flex-1 animate-pulse">
      <details className="border p-4 border-lightChampaigne" open>
        <summary className="text-lg font-semibold cursor-pointer bg-primaryGreenLight h-6 w-40"></summary>
        <ul className="mt-4 space-y-3">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="h-4 w-3/4 bg-primaryGreenLight"></li>
          ))}
        </ul>
      </details>
      <span className="sr-only">Table of content is loading...</span>
    </div>
  );
}
