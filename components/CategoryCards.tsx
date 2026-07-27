'use client';

import Image from 'next/image';
import { Scale, Truck, Anchor, Grid } from 'lucide-react';
import { categories } from '@/data/products';

const iconMap: Record<string, React.ElementType> = {
  Grid, Scale, Truck, Anchor,
};

const categoryImages: Record<string, string> = {
  'weighbridges': '/weighbridge.png',
  'solutions': '/crane-scale.png',
};

const categoryEmojis: Record<string, string> = {
  'weighbridges': '🚛',
  'solutions': '⚙️',
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
            Our Offerings
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-navy-900 mb-3 sm:mb-4">
            Explore Products & Solutions
          </h2>
          <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Official Essae Digitronics weighbridge products and automated industrial weighing solutions.
          </p>
        </div>

        {/* 2 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {displayCategories.map((cat, index) => {
            const Icon = iconMap[cat.icon] || Truck;
            const isSelected = selectedCategory === cat.id;
            const imageSrc = categoryImages[cat.id] || '/weighbridge.png';

            return (
              <button
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onCategorySelect?.(cat.id)}
                className={`category-card group text-left w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-orange-500 shadow-xl shadow-orange-500/20'
                    : 'border-transparent hover:border-orange-500/30'
                } bg-white shadow-card hover:shadow-card-hover flex flex-col`}
                aria-label={`Browse ${cat.label}`}
              >
                {/* Card Image Area */}
                <div className="relative h-36 sm:h-52 w-full overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />

                  {/* Emoji overlay */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                      {categoryEmojis[cat.id] || '🚛'}
                    </div>
                  </div>

                  {/* Product count badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                    {cat.productCount} Items
                  </div>

                  {/* Category name on image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <h3 className="font-display font-bold text-white text-lg sm:text-2xl leading-tight drop-shadow-md">
                      {cat.label}
                    </h3>
                  </div>

                  {/* Hover bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${isSelected ? 'text-orange-600' : 'text-navy-700 group-hover:text-orange-600'}`}>
                    <Icon size={16} className="shrink-0" />
                    <span>View All {cat.label}</span>
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
