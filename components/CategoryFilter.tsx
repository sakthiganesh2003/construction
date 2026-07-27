'use client';

import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { categories, sortOptions } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  resultCount: number;
}

export default function CategoryFilter({
  selectedCategory,
  searchQuery,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  resultCount,
}: CategoryFilterProps) {
  return (
    <div id="product-filters" className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Row – Search + Sort */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-60">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="product-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all duration-200 appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Result count */}
          <div className="ml-auto text-sm text-slate-500">
            <span className="font-semibold text-navy-900">{resultCount}</span>{' '}
            {resultCount === 1 ? 'product' : 'products'} found
          </div>
        </div>

        {/* Category Filters – Scrollable pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="Product categories">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-pill-${cat.id}`}
                onClick={() => onCategoryChange(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
                aria-pressed={isActive}
              >
                {cat.label}
                {cat.id !== 'all' && (
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {cat.productCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
