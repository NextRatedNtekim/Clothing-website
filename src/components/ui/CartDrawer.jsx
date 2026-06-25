import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22 }}
      className="flex gap-4 py-5 border-b border-brand-100"
    >
      <div className="w-18 h-20 shrink-0 bg-brand-50 border border-brand-100 flex items-center justify-center p-1" style={{ width: 72, height: 80 }}>
        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-brand-400 uppercase tracking-wider mb-0.5 truncate">{item.category}</p>
        <p className="text-sm font-medium text-brand-900 leading-snug line-clamp-2 mb-2">{item.name}</p>
        <p className="text-sm font-semibold text-brand-900 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 border border-brand-200 flex items-center justify-center text-brand-600 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all" aria-label="Decrease">
            <Minus size={11} />
          </button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 border border-brand-200 flex items-center justify-center text-brand-600 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all" aria-label="Increase">
            <Plus size={11} />
          </button>
        </div>
      </div>
      <button onClick={() => removeItem(item.id)} className="shrink-0 text-brand-300 hover:text-red-500 transition-colors self-start mt-0.5" aria-label="Remove">
        <Trash2 size={14} />
      </button>
    </motion.li>
  );
}

export default function CartDrawer({ onCheckout }) {
  const { items, isOpen, closeCart, subtotal, totalItems, clearCart } = useCart();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const shipping = subtotal > 0 && subtotal >= 100 ? 0 : subtotal > 0 ? 9.99 : 0;
  const total    = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={closeCart} />
          <motion.aside key="drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0, 0.16, 1] }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl" role="dialog" aria-modal="true" aria-label="Shopping cart">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-100 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-brand-700" />
                <h2 className="font-display text-lg font-semibold">Your Cart</h2>
                {totalItems > 0 && (
                  <motion.span key={totalItems} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="bg-brand-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-brand-400 hover:text-red-500 transition-colors underline underline-offset-2">Clear all</button>
                )}
                <button onClick={closeCart} className="text-brand-400 hover:text-brand-900 transition-colors" aria-label="Close">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-16 h-16 border border-brand-200 flex items-center justify-center mb-5">
                    <ShoppingBag size={22} strokeWidth={1} className="text-brand-300" />
                  </div>
                  <p className="text-brand-500 text-sm mb-1">Your cart is empty</p>
                  <p className="text-brand-400 text-xs mb-6">Add items from the shop to begin.</p>
                  <button onClick={closeCart} className="text-xs uppercase tracking-widest font-medium text-brand-700 border border-brand-300 px-5 py-2.5 hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul>
                  <AnimatePresence initial={false}>
                    {items.map((item) => <CartItem key={item.id} item={item} />)}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-100 px-6 py-6 shrink-0 bg-brand-50">
                {subtotal < 100 ? (
                  <div className="mb-4 bg-brand-100 px-4 py-2.5 text-xs text-brand-600">
                    Add <span className="font-semibold text-brand-900">${(100 - subtotal).toFixed(2)}</span> more for free shipping.
                  </div>
                ) : (
                  <div className="mb-4 bg-brand-900 text-white px-4 py-2.5 text-xs">Free shipping applied.</div>
                )}
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm text-brand-600">
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-brand-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-brand-900 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-brand-900 pt-2 border-t border-brand-200">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => { closeCart(); onCheckout?.(); }}
                  className="w-full bg-brand-900 text-white py-4 text-sm font-medium tracking-wider uppercase hover:bg-brand-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={closeCart} className="w-full mt-3 text-xs text-brand-400 hover:text-brand-700 transition-colors underline underline-offset-2">
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
