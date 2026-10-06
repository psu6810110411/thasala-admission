export default function Loading() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="space-y-3 text-center">
          <div className="h-8 w-48 bg-brand-gray-200 rounded-lg mx-auto" />
          <div className="h-4 w-64 bg-brand-gray-100 rounded mx-auto" />
        </div>
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-32 bg-brand-gray-100 rounded-2xl" />
          <div className="h-12 bg-brand-gray-100 rounded-xl" />
          <div className="h-12 bg-brand-gray-100 rounded-xl" />
        </div>
      </div>
    </main>
  );
}
