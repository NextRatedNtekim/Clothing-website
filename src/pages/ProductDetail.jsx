import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Shield, RotateCcw, Truck } from 'lucide-react';
import { useProduct } from '../hooks/useFakeStoreProducts';
import { useCart } from '../context/CartContext';
import { ProductDetailSkeleton } from '../components/ui/Skeletons';

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-brand-200 text-brand-200'}
          />
        ))}
      </div>
      <span className="text-sm text-brand-500">{rating?.toFixed(1)} ({count} reviews)</span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem } = useCart();
  const btnRef = useRef(null);

  if (loading) return <ProductDetailSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-5">
        <p className="text-brand-400 text-sm mb-4">Product not found or failed to load.</p>
        <Link to="/shop" className="text-xs uppercase tracking-widest border border-brand-300 px-5 py-2.5 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    const fromRect = btnRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
    addItem(product, fromRect);
  };

  const savings = product.originalPrice - product.price;
  const savingsPct = Math.round((savings / product.originalPrice) * 100);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center gap-2 text-xs text-brand-400">
          <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-700 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brand-700 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Save badge */}
            {savingsPct > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-brand-900 text-white text-xs tracking-widest uppercase px-3 py-1 font-medium">
                Save {savingsPct}%
              </span>
            )}
            <div className="aspect-square bg-brand-50 border border-brand-100 flex items-center justify-center p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-xs uppercase tracking-widest text-brand-400 mb-2">{product.category}</p>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-brand-900 leading-snug mb-3">
              {product.name}
            </h1>

            <StarRating rating={product.rating} count={product.reviewCount} />

            {/* Price */}
            <div className="flex items-center gap-3 mt-5 mb-6">
              <span className="text-3xl font-bold text-brand-900">${product.price.toFixed(2)}</span>
              <span className="text-lg text-brand-400 line-through">${product.originalPrice.toFixed(2)}</span>
              {savingsPct > 0 && (
                <span className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1">
                  {savingsPct}% off
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-brand-100 mb-6" />

            {/* Description */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-brand-400 mb-3">Product Description</p>
              <p className="text-brand-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Add to cart */}
            <button
              ref={btnRef}
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-brand-800 active:scale-[0.99] transition-all mb-4"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Add to Cart
            </button>

            <Link
              to="/shop"
              className="flex items-center justify-center gap-2 border border-brand-200 text-brand-600 py-3.5 text-sm font-medium hover:border-brand-500 hover:text-brand-900 transition-all"
            >
              <ArrowLeft size={15} />
              Continue Shopping
            </Link>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-brand-100">
              {[
                { icon: Truck, label: 'Free shipping', sub: 'Over $100' },
                { icon: RotateCcw, label: 'Free returns', sub: '30-day policy' },
                { icon: Shield, label: 'Secure checkout', sub: 'SSL encrypted' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={18} strokeWidth={1.5} className="text-brand-500" />
                  <p className="text-xs font-medium text-brand-900">{label}</p>
                  <p className="text-xs text-brand-400">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
