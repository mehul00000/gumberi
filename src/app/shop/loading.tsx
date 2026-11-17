export default function ShopLoading() {
  return (
    <div className="container-x grid gap-10 py-10 lg:grid-cols-[14rem_1fr]">
      <div className="hidden space-y-6 lg:block">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-20 animate-pulse bg-line" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-7 w-14 animate-pulse bg-line" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="mb-8 h-10 animate-pulse bg-line" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[3/4] animate-pulse bg-surface" />
              <div className="mt-4 h-4 w-2/3 animate-pulse bg-line" />
              <div className="mt-2 h-4 w-1/3 animate-pulse bg-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
