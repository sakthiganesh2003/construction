'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/CategoryCards';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid, { getFilteredCount } from '@/components/ProductGrid';
import StatsBar from '@/components/StatsBar';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';
import { products, categories } from '@/data/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    const el = document.getElementById('products');
    if (el) {
      const offset = 160;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const resultCount = getFilteredCount(products, selectedCategory, searchQuery);

  return (
    <ScrollRevealProvider>
      <div className="min-h-screen bg-slate-50 overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Stats Bar */}
        <div className="reveal-on-scroll">
          <StatsBar />
        </div>

        {/* Category Cards Overview */}
        <div className="reveal-on-scroll">
          <CategoryCards
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Products Section */}
        <section id="products" aria-labelledby="products-heading" className="bg-slate-50">
          <CategoryFilter
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
            resultCount={resultCount}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2
                  id="products-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-navy-900"
                >
                  {selectedCategory === 'all'
                    ? 'All Products'
                    : categories.find((c) => c.id === selectedCategory)?.label || 'Products'}
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Showing <span className="font-semibold text-navy-900">{resultCount}</span>{' '}
                  precision measurement solutions
                </p>
              </div>

              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  id="clear-filters"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSortBy('default');
                  }}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-orange-600 border border-slate-200 hover:border-orange-300 rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <span>✕</span>
                  Clear Filters
                </button>
              )}
            </div>

            <ProductGrid
              products={products}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortBy={sortBy}
            />
          </div>
        </section>

        {/* CTA Banner */}
        <div className="reveal-on-scroll">
          <CTABanner />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ScrollRevealProvider>
  );
}
