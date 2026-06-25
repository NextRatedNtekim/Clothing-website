import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home',    path: '/' },
  { label: 'About',   path: '/about' },
  { label: 'Shop',    path: '/shop' },
  { label: 'Blog',    path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const ticker = [
  'Free shipping on orders over $100',
  'Premium fabrics, honest construction',
  'New arrivals every season',
  'Free returns within 30 days',
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, toggleCart, cartIconRef } = useCart();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Ticker */}
      <div className="bg-brand-900 text-white text-xs tracking-widest overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="mx-14 uppercase">{t}</span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            <Link to="/" className="text-2xl font-display font-bold tracking-tight text-brand-900">
              WEARIX
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative group ${
                    location.pathname === link.path ? 'text-brand-900' : 'text-brand-500 hover:text-brand-900'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-brand-900 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-brand-500 hover:text-brand-900 transition-colors" aria-label="Search">
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Cart icon — ref forwarded so FlyingImage can read its position */}
              <button
                ref={cartIconRef}
                onClick={toggleCart}
                className="relative text-brand-500 hover:text-brand-900 transition-colors"
                aria-label={`Cart, ${totalItems} items`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="absolute -top-1.5 -right-1.5 bg-brand-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium leading-none"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-brand-700 hover:text-brand-900 transition-colors" aria-label="Open menu">
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.28 }} className="fixed top-0 right-0 h-full w-80 bg-white z-50 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-brand-100">
                <span className="text-xl font-display font-bold">WEARIX</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X size={22} className="text-brand-700" />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link to={link.path} className={`block py-3 text-lg font-medium border-b border-brand-100 transition-colors ${location.pathname === link.path ? 'text-brand-900' : 'text-brand-500 hover:text-brand-900'}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => { setMobileOpen(false); toggleCart(); }}
                  className="w-full flex items-center justify-center gap-2 border border-brand-200 text-brand-700 py-3 text-sm font-medium hover:bg-brand-50 transition-colors"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  View Cart
                  {totalItems > 0 && <span className="bg-brand-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>}
                </button>
                <Link to="/shop" className="block w-full text-center bg-brand-900 text-white py-3 text-sm font-medium tracking-wider uppercase hover:bg-brand-800 transition-colors">
                  Shop All
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
