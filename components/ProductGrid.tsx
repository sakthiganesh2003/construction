'use client';

import { useMemo } from 'react';
import { Package } from 'lucide-react';
import { type Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
}

export default function ProductGrid({
  products,
  selectedCategory,
  searchQuery,
  sortBy,
}: ProductGridProps) {
  const filtered = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 sm:mb-6">
          <Package size={32} className="text-slate-300" />
        </div>
        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-700 mb-2">No products found</h3>
        <p className="text-slate-400 text-sm max-w-sm">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      id="products-grid"
      className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
    >
      {filtered.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

// Export filtered count helper
export function getFilteredCount(
  products: Product[],
  selectedCategory: string,
  searchQuery: string
): number {
  let result = [...products];
  if (selectedCategory !== 'all') {
    result = result.filter((p) => p.categoryId === selectedCategory);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }
  return result.length;
}
