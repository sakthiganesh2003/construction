'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Star } from 'lucide-react';
import { type Product, categories } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const categoryLabel = categories.find((c) => c.id === product.categoryId)?.label || product.categoryId;

  return (
    <article
      id={`product-card-${product.id}`}
      className="product-card group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-200 flex flex-col h-full shadow-card hover:shadow-card-hover transition-all duration-300"
      aria-label={`${product.name} ${product.model}`}
    >
      {/* Image Area */}
      <div className="relative h-32 sm:h-52 w-full overflow-hidden">
        {/* Real product image */}
        <Image
          src={product.imageSrc}
          alt={`${product.name} – ${product.model}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={index < 4}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between">
          <span className="px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full bg-orange-500 text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider shadow-md truncate max-w-[80px] sm:max-w-none">
            {categoryLabel}
          </span>
          <div className="flex gap-1 sm:gap-2">
            {product.isNew && (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-green-500 text-white text-[9px] sm:text-xs font-bold flex items-center gap-1">
                <Zap size={9} />
                <span className="hidden sm:inline">New</span>
              </span>
            )}
            {product.isBestseller && (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500 text-white text-[9px] sm:text-xs font-bold flex items-center gap-1">
                <Star size={9} />
                <span className="hidden sm:inline">Best</span>
              </span>
            )}
          </div>
        </div>

        {/* Model tag at bottom */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
          <span className="glass text-white text-[10px] sm:text-xs font-mono font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg tracking-wider border border-white/20">
            {product.model}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-3 sm:p-6 justify-between">
        <div>
          <h3 className="font-display font-bold text-sm sm:text-xl text-navy-900 group-hover:text-orange-600 transition-colors duration-200 mb-1 sm:mb-2 leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-5">
            {product.shortDescription}
          </p>

          {/* Specs (Show top 2 specs on mobile to save vertical space) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mb-3 sm:mb-6">
            {product.specs.slice(0, 2).map((spec) => (
              <div key={spec} className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-600 truncate">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-3 pt-2 sm:pt-4 border-t border-slate-100 mt-auto">
          <Link
            href={`/products/${product.id}`}
            id={`view-details-${product.id}`}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-5 sm:py-3 bg-navy-900 hover:bg-orange-500 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 group/btn"
            aria-label={`View details for ${product.name}`}
          >
            <span>Details</span>
            <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-200 shrink-0" />
          </Link>
          <a
            href="mailto:sales@essae.com"
            id={`enquire-${product.id}`}
            className="px-2 py-2 sm:px-4 sm:py-3 border-2 border-slate-200 hover:border-orange-400 text-slate-600 hover:text-orange-600 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-200 text-center"
            aria-label={`Enquire about ${product.name}`}
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
