import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered]   = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const btnRef = useRef(null);
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (justAdded) return;

    // capture the button's bounding rect to use as arc start point
    const fromRect = btnRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
    addItem(product, fromRect);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        {/* Image block */}
        <Link to={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-brand-100">
            {/* Badge */}
            <span className="absolute top-3 left-3 z-10 bg-white text-brand-900 text-xs tracking-widest uppercase px-3 py-1 font-medium shadow-sm">
              {product.badge}
            </span>

            {/* Rating pill */}
            <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-brand-800 text-xs px-2 py-1 flex items-center gap-1 font-medium">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              {product.rating?.toFixed(1)}
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain object-center p-4 transition-transform duration-700 group-hover:scale-105"
            />

            {/* Add to cart overlay */}
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              <button
                ref={btnRef}
                onClick={handleAdd}
                disabled={justAdded}
                className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                  justAdded
                    ? 'bg-brand-900 text-white cursor-default'
                    : 'bg-white/95 text-brand-900 hover:bg-brand-900 hover:text-white'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {justAdded ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ x: [-2, 2, -2, 2, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <ShoppingBag size={15} strokeWidth={1.5} />
                      </motion.span>
                      Flying to cart...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={15} strokeWidth={1.5} />
                      Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="mt-3 flex items-start justify-between gap-2">
          <Link to={`/shop/${product.slug}`} className="flex-1 min-w-0">
            <p className="text-xs text-brand-400 uppercase tracking-wider mb-0.5">{product.category}</p>
            <h3 className="text-sm font-medium text-brand-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-brand-900">${product.price.toFixed(2)}</p>
            <p className="text-xs text-brand-400 line-through">${product.originalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Mobile add button */}
        <button
          onClick={handleAdd}
          disabled={justAdded}
          className={`mt-2.5 w-full py-2.5 text-xs font-medium tracking-widest uppercase border transition-all duration-200 lg:hidden ${
            justAdded
              ? 'bg-brand-900 text-white border-brand-900'
              : 'border-brand-200 text-brand-600 hover:bg-brand-900 hover:text-white hover:border-brand-900'
          }`}
        >
          {justAdded ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}
