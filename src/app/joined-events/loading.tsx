
export default function JoinedEventsLoading() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] px-5 py-16 dark:bg-[#101c16] sm:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-12">
          <div className="h-4 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-5 h-10 w-72 max-w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 h-4 w-full max-w-md rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#344b3d] dark:bg-[#17271d]"
            >
              <div className="h-52 bg-gray-200 dark:bg-gray-700" />

              <div className="space-y-4 p-6">
                <div className="h-4 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-6 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

                <div className="flex items-center justify-between pt-3">
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
