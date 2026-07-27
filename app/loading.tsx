// Skeleton loading screen for the home / products page
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse-soft">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-navy-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 shimmer-box" />
            <div className="space-y-1.5">
              <div className="w-16 h-4 rounded-md bg-white/10 shimmer-box" />
              <div className="w-20 h-2.5 rounded-md bg-white/8 shimmer-box" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {[60, 72, 80, 60, 68].map((w, i) => (
              <div key={i} className="h-3 rounded-md bg-white/10 shimmer-box" style={{ width: w }} />
            ))}
          </div>
          <div className="w-28 h-9 rounded-xl bg-orange-500/30 shimmer-box" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="relative min-h-screen bg-navy-900 flex flex-col overflow-hidden pt-16">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text skeleton */}
            <div className="space-y-6">
              <div className="w-64 h-8 rounded-full bg-white/8 shimmer-box" />
              <div className="space-y-4">
                <div className="w-full h-14 rounded-2xl bg-white/10 shimmer-box" />
                <div className="w-4/5 h-14 rounded-2xl bg-orange-500/20 shimmer-box" />
                <div className="w-3/5 h-14 rounded-2xl bg-white/8 shimmer-box" />
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 rounded-full bg-white/8 shimmer-box" />
                <div className="w-5/6 h-4 rounded-full bg-white/8 shimmer-box" />
                <div className="w-4/6 h-4 rounded-full bg-white/8 shimmer-box" />
              </div>
              <div className="flex gap-4">
                <div className="w-44 h-14 rounded-2xl bg-orange-500/30 shimmer-box" />
                <div className="w-40 h-14 rounded-2xl bg-white/10 shimmer-box" />
              </div>
            </div>
            {/* Right card skeleton */}
            <div className="hidden lg:block">
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl p-4 h-24 shimmer-box" />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between">
                    <div className="w-32 h-4 rounded-full bg-white/10 shimmer-box" />
                    <div className="w-12 h-7 rounded-lg bg-white/10 shimmer-box" />
                  </div>
                  <div className="h-2 rounded-full bg-white/10 shimmer-box" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip skeleton */}
        <div className="border-t border-white/10 bg-white/3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 shimmer-box shrink-0" />
                  <div className="space-y-2">
                    <div className="w-16 h-5 rounded-lg bg-white/15 shimmer-box" />
                    <div className="w-24 h-3 rounded-full bg-white/8 shimmer-box" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats dark section skeleton */}
      <div className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="w-36 h-7 rounded-full bg-white/10 shimmer-box mx-auto" />
            <div className="w-64 h-12 rounded-2xl bg-white/10 shimmer-box mx-auto" />
            <div className="w-80 h-5 rounded-full bg-white/8 shimmer-box mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/15 shimmer-box" />
                <div className="w-28 h-14 rounded-2xl bg-white/10 shimmer-box" />
                <div className="w-24 h-4 rounded-full bg-white/8 shimmer-box" />
                <div className="w-36 h-3 rounded-full bg-white/6 shimmer-box" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-4">
            <div className="w-44 h-7 rounded-full bg-orange-500/15 shimmer-box mx-auto" />
            <div className="w-72 h-12 rounded-2xl bg-slate-200 shimmer-box mx-auto" />
            <div className="w-96 h-5 rounded-full bg-slate-200 shimmer-box mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 shadow-card">
                <div className="h-44 bg-slate-200 shimmer-box" />
                <div className="p-5 space-y-3">
                  <div className="w-3/4 h-5 rounded-lg bg-slate-200 shimmer-box" />
                  <div className="w-full h-3 rounded-full bg-slate-100 shimmer-box" />
                  <div className="w-5/6 h-3 rounded-full bg-slate-100 shimmer-box" />
                  <div className="w-32 h-4 rounded-lg bg-slate-200 shimmer-box" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products section skeleton */}
      <div className="bg-slate-50 pb-16">
        {/* Filter bar */}
        <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 h-10 rounded-xl bg-slate-100 shimmer-box" />
              <div className="w-36 h-10 rounded-xl bg-slate-100 shimmer-box" />
              <div className="w-28 h-10 rounded-xl bg-slate-100 shimmer-box ml-auto" />
            </div>
            <div className="flex gap-2 overflow-hidden">
              {[80, 96, 112, 88, 104, 88, 112].map((w, i) => (
                <div key={i} className="h-9 rounded-full bg-slate-100 shimmer-box shrink-0" style={{ width: w }} />
              ))}
            </div>
          </div>
        </div>

        {/* Product cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="w-40 h-9 rounded-xl bg-slate-200 shimmer-box" />
              <div className="w-56 h-4 rounded-full bg-slate-100 shimmer-box" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 shadow-card">
      {/* Image area */}
      <div className="h-52 bg-slate-200 shimmer-box relative">
        <div className="absolute top-4 left-4 w-24 h-7 rounded-full bg-slate-300/60 shimmer-box" />
        <div className="absolute bottom-4 left-4 w-20 h-7 rounded-lg bg-slate-300/60 shimmer-box" />
      </div>
      {/* Body */}
      <div className="p-6 space-y-4">
        <div className="w-4/5 h-6 rounded-lg bg-slate-200 shimmer-box" />
        <div className="space-y-2">
          <div className="w-full h-3.5 rounded-full bg-slate-100 shimmer-box" />
          <div className="w-5/6 h-3.5 rounded-full bg-slate-100 shimmer-box" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 rounded-full bg-slate-100 shimmer-box" />
          ))}
        </div>
        <div className="pt-4 border-t border-slate-100 flex gap-3">
          <div className="flex-1 h-11 rounded-xl bg-slate-200 shimmer-box" />
          <div className="w-20 h-11 rounded-xl bg-slate-100 shimmer-box" />
        </div>
      </div>
    </div>
  );
}
