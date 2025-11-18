export function CharacterSkeleton() {
  return (
    <section className="flex justify-center my-8 md:my-12">
      <div className="w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 animate-pulse shadow-character" />
    </section>
  );
}

export function ProgressSkeleton() {
  return (
    <div className="max-w-md mx-auto px-4 mb-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-stone-200 rounded animate-pulse" />
              <div className="w-16 h-3 bg-stone-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="w-16 h-5 bg-stone-200 rounded animate-pulse ml-auto" />
            <div className="w-12 h-3 bg-stone-200 rounded animate-pulse ml-auto" />
          </div>
        </div>
        <div className="bg-stone-200 rounded-full h-2 animate-pulse" />
      </div>
    </div>
  );
}

export function ModuleGridSkeleton() {
  return (
    <div className="px-4 md:px-6 lg:px-8 mb-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-40 md:h-48 bg-gradient-to-br from-stone-200 to-stone-300 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
