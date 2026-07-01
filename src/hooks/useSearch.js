import { useMemo } from 'react';

/**
 * Filters a product list by a search query, matching against
 * product name and category (case-insensitive, partial match).
 */
export function useSearch(products, query) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const category = (p.category || '').toLowerCase();
      return name.includes(q) || category.includes(q);
    });
  }, [products, query]);
}
