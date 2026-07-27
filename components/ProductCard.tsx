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
      className="product-card group bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-200 flex flex-col h-full"
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={`${product.name} ${product.model}`}
    >
      {/* Image Area */}
      <div className="relative h-52 overflow-hidden">
        {/* Real product image */}
        <Image
          src={product.imageSrc}
          alt={`${product.name} – ${product.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={index < 3}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
            {categoryLabel}
          </span>
          <div className="flex gap-2">
            {product.isNew && (
              <span className="px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-bold flex items-center gap-1">
                <Zap size={10} />New
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-1">
                <Star size={10} />Best
              </span>
            )}
          </div>
        </div>

        {/* Model tag at bottom */}
        <div className="absolute bottom-4 left-4">
          <span className="glass text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg tracking-wider border border-white/20">
            {product.model}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-bold text-xl text-navy-900 group-hover:text-orange-600 transition-colors duration-200 mb-2 leading-snug">
          {product.name}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5">
          {product.shortDescription}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {product.specs.slice(0, 4).map((spec) => (
            <div key={spec} className="flex items-start gap-1.5 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0 mt-1" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* CTAs */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <Link
            href={`/products/${product.id}`}
            id={`view-details-${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-navy-900 hover:bg-orange-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 group/btn"
            aria-label={`View details for ${product.name}`}
          >
            View Details
            <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
          <a
            href="mailto:sales@essae.com"
            id={`enquire-${product.id}`}
            className="px-4 py-3 border-2 border-slate-200 hover:border-orange-400 text-slate-600 hover:text-orange-600 text-sm font-semibold rounded-xl transition-all duration-200"
            aria-label={`Enquire about ${product.name}`}
          >
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
