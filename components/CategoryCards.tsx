'use client';

import Image from 'next/image';
import { Scale, Truck, ShoppingCart, FlaskConical, Clock, Anchor } from 'lucide-react';
import { categories } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  Scale, Truck, ShoppingCart, FlaskConical, Clock, Anchor,
};

const categoryImages: Record<string, string> = {
  'industrial-scales': '/industrial-scales.png',
  'weighbridges': '/weighbridge.png',
  'retail-pos': '/retail-pos.png',
  'milk-analysers': '/milk-analyser.png',
  'gps-clocks': '/gps-clock.png',
  'crane-systems': '/crane-scale.png',
};

const categoryEmojis: Record<string, string> = {
  'industrial-scales': '⚖️',
  'weighbridges': '🚛',
  'retail-pos': '🏪',
  'milk-analysers': '🥛',
  'gps-clocks': '🛰️',
  'crane-systems': '🏗️',
};

interface CategoryCardsProps {
  onCategorySelect?: (categoryId: string) => void;
  selectedCategory?: string;
}

export default function CategoryCards({ onCategorySelect, selectedCategory }: CategoryCardsProps) {
  const displayCategories = categories.filter((c) => c.id !== 'all');

  return (
    <section id="categories" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-600 text-xs sm:text-sm font-semibold rounded-full uppercase tracking-wider mb-3 sm:mb-4">
            Our Product Range
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-navy-900 mb-3 sm:mb-4">
            Explore by Category
          </h2>
          <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Comprehensive measurement solutions spanning industrial, commercial, and research applications.
          </p>
        </div>

        {/* 2 Columns on mobile (grid-cols-2), 3 on desktop (lg:grid-cols-3) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {displayCategories.map((cat, index) => {
            const Icon = iconMap[cat.icon] || Scale;
            const isSelected = selectedCategory === cat.id;
            const imageSrc = categoryImages[cat.id];

            return (
              <button
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onCategorySelect?.(cat.id)}
                className={`category-card group text-left w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-orange-500 shadow-lg shadow-orange-500/20'
                    : 'border-transparent hover:border-orange-500/30'
                } bg-white shadow-card hover:shadow-card-hover flex flex-col`}
                aria-label={`Browse ${cat.label}`}
              >
                {/* Card Image Area */}
                <div className="relative h-28 sm:h-44 w-full overflow-hidden">
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />

                  {/* Emoji overlay */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center text-base sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                      {categoryEmojis[cat.id] || '📦'}
                    </div>
                  </div>

                  {/* Product count badge */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-orange-500 text-white text-[10px] sm:text-xs font-bold">
                    {cat.productCount} Products
                  </div>

                  {/* Category name on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4">
                    <h3 className="font-display font-bold text-white text-sm sm:text-xl leading-tight drop-shadow-md line-clamp-1">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Hover bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2 sm:mb-4">
                    {cat.description}
                  </p>
                  <div className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${isSelected ? 'text-orange-600' : 'text-navy-700 group-hover:text-orange-600'}`}>
                    <Icon size={14} className="shrink-0" />
                    <span className="truncate">Explore</span>
                    <span className="ml-auto text-xs opacity-60">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
