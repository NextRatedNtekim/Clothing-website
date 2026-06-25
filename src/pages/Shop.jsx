import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProduct';
import ProductCard from '../components/ui/ProductCard';
import { GridSkeleton } from '../components/ui/Skeletons';
import MarqueeTicker from '../components/ui/MarqueeTicker';
import TrustStrip from '../components/ui/TrustStrip';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ['All', ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let list = activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);
    switch (sortBy) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating':     return [...list].sort((a, b) => b.rating - a.rating);
      default:           return list;
    }
  }, [products, activeCategory, sortBy]);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-brand-950">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
          alt="Shop"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-400 mb-3">Wearix</p>
          <h1 className="text-4xl lg:text-6xl font-display font-semibold text-white mb-4">
            Shop All Collections
          </h1>
          <p className="text-brand-400 text-base max-w-md mx-auto">
            Every piece designed for modern, effortless living.
          </p>
        </div>
      </section>

      <MarqueeTicker />

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {loading
              ? ['All', 'Loading...'].map((c) => (
                  <div key={c} className="skeleton h-8 w-24 rounded-none" />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-xs uppercase tracking-widest font-medium border transition-colors ${
                      activeCategory === cat
                        ? 'bg-brand-900 text-white border-brand-900'
                        : 'bg-white text-brand-600 border-brand-200 hover:border-brand-500 hover:text-brand-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
          </div>
          <div className="flex items-center gap-4">
            {!loading && (
              <span className="text-xs text-brand-400">{filtered.length} items</span>
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-brand-200 px-3 py-2 text-brand-700 bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-brand-400 text-sm mb-2">Failed to load products.</p>
            <p className="text-brand-300 text-xs">{error}</p>
          </div>
        )}

        {/* Skeleton / products */}
        {loading ? (
          <GridSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      <TrustStrip />
    </>
  );
}
