import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, Phone, Mail, Star, Zap, ArrowRight } from 'lucide-react';
import { products, categories } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

// Generate all product pages at build time
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

// Dynamic metadata
export async function generateMetadata(props: PageProps<'/products/[id]'>): Promise<Metadata> {
  const { id } = await props.params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} ${product.model} | Essae Digitronics`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero / Image Banner */}
      <section className="relative h-[55vh] min-h-[420px] bg-navy-900 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={`${product.name} – ${product.model}`}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-orange-400 transition-colors duration-200">Home</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-orange-400 transition-colors duration-200">Products</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              {/* Category + status badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {category?.label}
                </span>
                {product.isNew && (
                  <span className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                    <Zap size={12} /> New Arrival
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5">
                    <Star size={12} /> Bestseller
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
                {product.name}
              </h1>
              <p className="text-orange-400 font-mono font-bold text-xl tracking-wider">
                Model: {product.model}
              </p>
            </div>

            {/* Back button */}
            <Link
              href="/#products"
              id="back-to-products"
              className="inline-flex items-center gap-2 px-5 py-3 glass border border-white/20 text-white hover:text-orange-400 hover:border-orange-400/40 font-medium rounded-xl transition-all duration-200 text-sm"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left — Main Info */}
          <div className="lg:col-span-2 space-y-10">

            {/* Overview */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-sm font-bold">01</span>
                </span>
                Product Overview
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-card">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-sm font-bold">02</span>
                </span>
                Technical Specifications
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-orange-50 hover:border-orange-200 transition-all duration-200"
                  >
                    <CheckCircle size={18} className="text-orange-500 shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-navy-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 hero-grid opacity-20" />
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400 text-sm font-bold">03</span>
                  </span>
                  Why Choose {product.model}?
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'ISO 9001:2015 Certified Manufacturing',
                    'NABL Calibrated & OIML Compliant',
                    'Comprehensive AMC & Service Support',
                    'Customisation Available on Request',
                    '24/7 Customer Helpline',
                    'Pan-India Installation Network',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-orange-400 text-xs">✓</span>
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">
                  Related Products in {category?.label}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedProducts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/products/${rel.id}`}
                      id={`related-${rel.id}`}
                      className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-100 hover:border-orange-300 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={rel.imageSrc}
                          alt={rel.name}
                          fill
                          sizes="300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="text-white/70 font-mono text-xs">{rel.model}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-navy-900 group-hover:text-orange-600 transition-colors duration-200 text-sm leading-snug mb-1">
                          {rel.name}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2">{rel.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Sticky Sidebar */}
          <aside className="space-y-6">
            {/* Enquiry Card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-slate-100 shadow-card sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{product.imageIcon}</div>
                <h3 className="font-display font-bold text-xl text-navy-900 mb-1">{product.name}</h3>
                <span className="font-mono text-orange-500 text-sm font-bold">{product.model}</span>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`mailto:sales@essae.com?subject=Enquiry: ${product.model} – ${product.name}`}
                  id={`detail-enquire-${product.id}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                >
                  <Mail size={18} />
                  Request a Quote
                </a>
                <a
                  href="tel:+918026543210"
                  id={`detail-call-${product.id}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-bold rounded-2xl transition-all duration-300"
                >
                  <Phone size={18} />
                  Call an Expert
                </a>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-3">
                {['Free On-site Demo', 'Quick Delivery', 'Installation Support', 'AMC Available'].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-navy-900 rounded-3xl p-6 text-white">
              <h4 className="font-semibold text-sm text-slate-400 uppercase tracking-wider mb-4">Category</h4>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category?.description ? '📁' : '📦'}</span>
                <div>
                  <p className="text-white font-bold">{category?.label}</p>
                  <p className="text-slate-400 text-xs">{category?.productCount} products in this range</p>
                </div>
              </div>
              <Link
                href={`/#products`}
                className="mt-5 flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors duration-200 group"
              >
                View all {category?.label}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
