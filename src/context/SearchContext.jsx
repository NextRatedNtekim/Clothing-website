import { createContext, useContext, useState, useCallback } from 'react';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [query, setQuery]     = useState('');
  const [isOpen, setIsOpen]   = useState(false);

  const openSearch  = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => setIsOpen(false), []);

  return (
    <SearchContext.Provider value={{ query, setQuery, isOpen, openSearch, closeSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useGlobalSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useGlobalSearch must be used inside SearchProvider');
  return ctx;
}
