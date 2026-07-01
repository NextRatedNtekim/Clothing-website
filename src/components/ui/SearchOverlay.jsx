import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useGlobalSearch } from '../../context/SearchContext';
import { useProducts } from '../../hooks/useFakeStoreProducts';
import { useSearch } from '../../hooks/useSearch';

export default function SearchOverlay() {
  const { query, setQuery, isOpen, closeSearch } = useGlobalSearch();
  const { products } = useProducts();
  const results = useSearch(products, query);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Autofocus the input when the overlay opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    navigate('/shop');
  };

  const handleResultClick = (slug) => {
    closeSearch();
    navigate(`/shop/${slug}`);
  };

  const limitedResults = results.slice(0, 6);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="search-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={closeSearch}
          />
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.32, 0, 0.16, 1] }}
            className="fixed top-0 left-0 right-0 z-[60] bg-white shadow-xl max-w-full"
          >
            <div className="max-w-2xl mx-auto w-full px-5 sm:px-6 py-6">
              {/* Input row */}
              <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-brand-200 pb-4">
                <Search size={20} strokeWidth={1.5} className="text-brand-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products or categories..."
                  className="flex-1 min-w-0 text-base sm:text-lg text-brand-900 placeholder-brand-300 focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="shrink-0 text-brand-400 hover:text-brand-900 transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </form>

              {/* Results */}
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <p className="text-sm text-brand-400 py-6 text-center">
                    Start typing to search the catalogue by name or category.
                  </p>
                ) : limitedResults.length === 0 ? (
                  <p className="text-sm text-brand-400 py-6 text-center">
                    No results for "{query}". Try a different name or category.
                  </p>
                ) : (
                  <ul className="divide-y divide-brand-100">
                    {limitedResults.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => handleResultClick(p.slug)}
                          className="w-full flex items-center gap-4 py-3 text-left hover:bg-brand-50 transition-colors px-2 -mx-2"
                        >
                          <div className="w-12 h-12 shrink-0 bg-brand-50 border border-brand-100 flex items-center justify-center p-1">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-900 truncate">{p.name}</p>
                            <p className="text-xs text-brand-400">{p.category}</p>
                          </div>
                          <span className="text-sm font-semibold text-brand-900 shrink-0">${p.price.toFixed(2)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* See all results link */}
                {results.length > 6 && (
                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 mt-2 py-3 text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors border-t border-brand-100"
                  >
                    See all {results.length} results
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
