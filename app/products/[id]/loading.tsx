// Skeleton loading screen for individual product detail pages
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
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
          <div className="w-28 h-9 rounded-xl bg-orange-500/30 shimmer-box" />
        </div>
      </div>

      {/* Hero image skeleton */}
      <div className="relative h-[55vh] min-h-[420px] bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-slate-700/40 shimmer-box" />
        <div className="absolute inset-0 hero-grid opacity-20" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-3.5 rounded-full bg-white/15 shimmer-box" />
            <div className="w-2 h-3 text-slate-500">/</div>
            <div className="w-20 h-3.5 rounded-full bg-white/15 shimmer-box" />
            <div className="w-2 h-3 text-slate-500">/</div>
            <div className="w-32 h-3.5 rounded-full bg-white/15 shimmer-box" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex gap-3">
                <div className="w-28 h-7 rounded-full bg-orange-500/40 shimmer-box" />
                <div className="w-24 h-7 rounded-full bg-green-500/30 shimmer-box" />
              </div>
              {/* Title */}
              <div className="w-80 h-14 rounded-2xl bg-white/15 shimmer-box" />
              <div className="w-48 h-7 rounded-xl bg-orange-500/25 shimmer-box" />
            </div>
            {/* Back button */}
            <div className="w-40 h-11 rounded-xl bg-white/10 shimmer-box" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 shimmer-box" />
                <div className="w-40 h-7 rounded-xl bg-slate-200 shimmer-box" />
              </div>
              <div className="space-y-2.5">
                <div className="w-full h-4 rounded-full bg-slate-100 shimmer-box" />
                <div className="w-full h-4 rounded-full bg-slate-100 shimmer-box" />
                <div className="w-5/6 h-4 rounded-full bg-slate-100 shimmer-box" />
                <div className="w-4/6 h-4 rounded-full bg-slate-100 shimmer-box" />
              </div>
            </div>

            {/* Specs card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 shimmer-box" />
                <div className="w-52 h-7 rounded-xl bg-slate-200 shimmer-box" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 shimmer-box shrink-0" />
                    <div className="flex-1 h-4 rounded-full bg-slate-200 shimmer-box" />
                  </div>
                ))}
              </div>
            </div>

            {/* Features dark card */}
            <div className="bg-navy-900 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 shimmer-box" />
                <div className="w-48 h-7 rounded-xl bg-white/15 shimmer-box" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 shimmer-box shrink-0" />
                    <div className="flex-1 h-3.5 rounded-full bg-white/10 shimmer-box" />
                  </div>
                ))}
              </div>
            </div>

            {/* Related products */}
            <div>
              <div className="w-64 h-8 rounded-xl bg-slate-200 shimmer-box mb-6" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border-2 border-slate-100 shadow-card">
                    <div className="h-36 bg-slate-200 shimmer-box" />
                    <div className="p-4 space-y-2">
                      <div className="w-3/4 h-4 rounded-lg bg-slate-200 shimmer-box" />
                      <div className="w-full h-3 rounded-full bg-slate-100 shimmer-box" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Enquiry card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-100 shadow-card">
              <div className="text-center space-y-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 shimmer-box mx-auto" />
                <div className="w-40 h-6 rounded-xl bg-slate-200 shimmer-box mx-auto" />
                <div className="w-24 h-4 rounded-full bg-orange-500/20 shimmer-box mx-auto" />
              </div>
              <div className="space-y-3 mb-6">
                <div className="w-full h-14 rounded-2xl bg-orange-500/20 shimmer-box" />
                <div className="w-full h-14 rounded-2xl bg-slate-200 shimmer-box" />
              </div>
              <div className="border-t border-slate-100 pt-5 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 shimmer-box shrink-0" />
                    <div className="flex-1 h-3.5 rounded-full bg-slate-100 shimmer-box" />
                  </div>
                ))}
              </div>
            </div>

            {/* Category card */}
            <div className="bg-navy-900 rounded-3xl p-6">
              <div className="w-24 h-3.5 rounded-full bg-white/15 shimmer-box mb-4" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 shimmer-box" />
                <div className="space-y-1.5">
                  <div className="w-32 h-4 rounded-lg bg-white/15 shimmer-box" />
                  <div className="w-40 h-3 rounded-full bg-white/10 shimmer-box" />
                </div>
              </div>
              <div className="mt-5 w-36 h-4 rounded-full bg-orange-400/20 shimmer-box" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
