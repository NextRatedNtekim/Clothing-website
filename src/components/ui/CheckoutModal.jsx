import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Download, Package, ShoppingBag, CreditCard, Receipt, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function generateOrderNumber() {
  return 'WRX-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 9000 + 1000);
}

function Receipt({ order, onClose }) {
  const receiptRef = useRef(null);

  const handlePrint = () => {
    const content = receiptRef.current;
    const win = window.open('', '_blank', 'width=480,height=700');
    win.document.write(`
      <html>
        <head>
          <title>Wearix Order ${order.orderNumber}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Inter, sans-serif; color: #1c1917; background: #fff; padding: 40px 32px; font-size: 13px; }
            .logo { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 6px; }
            .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #78716c; margin-bottom: 2px; }
            .divider { border: none; border-top: 1px solid #e7e5e4; margin: 18px 0; }
            .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .bold { font-weight: 600; }
            .total-row { display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; padding-top: 10px; border-top: 2px solid #1c1917; margin-top: 8px; }
            .item-img { width: 44px; height: 44px; object-fit: contain; border: 1px solid #e7e5e4; padding: 3px; }
            .item-row { display: flex; gap: 12px; align-items: center; margin-bottom: 14px; }
            .item-info { flex: 1; }
            .thank-you { text-align: center; margin-top: 32px; font-size: 11px; color: #78716c; }
          </style>
        </head>
        <body>
          <div class="logo">WEARIX</div>
          <p class="label">Order Confirmation Receipt</p>
          <hr class="divider" />
          <div class="row"><span class="label">Order Number</span><span class="bold">${order.orderNumber}</span></div>
          <div class="row"><span class="label">Date</span><span>${order.date}</span></div>
          <hr class="divider" />
          <p class="label" style="margin-bottom:14px">Items Ordered</p>
          ${order.items.map(item => `
            <div class="item-row">
              <img class="item-img" src="${item.image}" alt="${item.name}" />
              <div class="item-info">
                <div class="bold" style="font-size:12px;line-height:1.4">${item.name}</div>
                <div style="color:#78716c;font-size:11px">Qty: ${item.quantity} &times; $${item.price.toFixed(2)}</div>
              </div>
              <div class="bold">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          `).join('')}
          <hr class="divider" />
          <div class="row"><span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span></div>
          <div class="row"><span>Shipping</span><span>${order.shipping === 0 ? 'Free' : '$' + order.shipping.toFixed(2)}</span></div>
          <div class="total-row"><span>Total</span><span>$${order.total.toFixed(2)}</span></div>
          <div class="thank-you">
            <p>Thank you for shopping with Wearix.</p>
            <p style="margin-top:4px">hello@wearix.com &bull; wearix.com</p>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-5"
      >
        <Check size={28} strokeWidth={2.5} className="text-white" />
      </motion.div>

      <h2 className="font-display text-2xl font-semibold text-brand-900 mb-1">Order Confirmed</h2>
      <p className="text-brand-500 text-sm mb-6">Thank you for your order. Here is your receipt.</p>

      {/* Receipt card */}
      <div ref={receiptRef} className="bg-brand-50 border border-brand-100 p-6 text-left mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-200">
          <span className="font-display text-xl font-bold text-brand-900">WEARIX</span>
          <span className="text-xs text-brand-400">Order Confirmation</span>
        </div>

        <div className="flex justify-between mb-1">
          <span className="text-xs uppercase tracking-widest text-brand-400">Order No.</span>
          <span className="text-sm font-semibold text-brand-900">{order.orderNumber}</span>
        </div>
        <div className="flex justify-between mb-4 pb-4 border-b border-brand-200">
          <span className="text-xs uppercase tracking-widest text-brand-400">Date</span>
          <span className="text-sm text-brand-600">{order.date}</span>
        </div>

        {/* Items */}
        <p className="text-xs uppercase tracking-widest text-brand-400 mb-3">Items</p>
        <ul className="space-y-3 mb-4 pb-4 border-b border-brand-200">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-brand-100 flex items-center justify-center shrink-0 p-1">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-brand-900 leading-snug line-clamp-1">{item.name}</p>
                <p className="text-xs text-brand-400">Qty: {item.quantity} &times; ${item.price.toFixed(2)}</p>
              </div>
              <span className="text-sm font-semibold text-brand-900 shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div className="space-y-1.5 mb-1">
          <div className="flex justify-between text-sm text-brand-500">
            <span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-brand-500">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? <span className="text-brand-900 font-medium">Free</span> : `$${order.shipping.toFixed(2)}`}</span>
          </div>
        </div>
        <div className="flex justify-between text-base font-bold text-brand-900 pt-3 mt-3 border-t-2 border-brand-900">
          <span>Total</span><span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 border border-brand-300 text-brand-700 py-3 text-sm font-medium tracking-wide hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-all"
        >
          <Download size={15} />
          Print Receipt
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-brand-900 text-white py-3 text-sm font-medium tracking-wide hover:bg-brand-800 transition-colors flex items-center justify-center gap-2"
        >
          <Package size={15} />
          Continue Shopping
        </button>
      </div>
    </motion.div>
  );
}

export default function CheckoutModal({ isOpen, onClose }) {
  const { items, subtotal, clearCart } = useCart();
  const [stage, setStage] = useState('summary'); // 'summary' | 'receipt'
  const [order, setOrder]   = useState(null);

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total    = subtotal + shipping;

  const handlePlaceOrder = () => {
    const newOrder = {
      orderNumber: generateOrderNumber(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: [...items],
      subtotal,
      shipping,
      total,
    };
    setOrder(newOrder);
    setStage('receipt');
    clearCart();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStage('summary'), 350);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="co-bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            key="co-modal"
            // initial={{ opacity: 0, y: 40 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 40 }}
            // transition={{ type: 'tween', duration: 0.28 }}
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 60,
              scale: 0.96
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24
            }}
            // className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-full sm:w-[480px] bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
            className="
                  fixed
                  bottom-0
                  left-0
                  right-0
                  sm:left-1/2
                  sm:right-auto
                  sm:top-1/2
                  sm:-translate-x-1/2
                  sm:-translate-y-1/2
                  z-50
                  w-full
                  sm:w-[520px]
                  bg-white
                  shadow-2xl
                  rounded-t-3xl
                  sm:rounded-none
                  max-h-[95vh]
                  overflow-hidden
                  "
          >
            <div className="p-6 sm:p-8">
              {/* Close button */}
              <button onClick={handleClose} className="absolute top-5 right-5 text-brand-400 hover:text-brand-900 transition-colors" aria-label="Close">
                <X size={20} strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                {stage === 'summary' ? (
                  <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-xs uppercase tracking-widest text-brand-400 mb-1">Checkout</p>
                    <h2 className="font-display text-2xl font-semibold text-brand-900 mb-6">Order Summary</h2>

                    {/* Item list */}
                    <ul className="space-y-4 mb-6 max-h-52 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <li key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand-50 border border-brand-100 shrink-0 flex items-center justify-center p-1">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-brand-900 leading-snug line-clamp-1">{item.name}</p>
                            <p className="text-xs text-brand-400">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-brand-900 shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Totals */}
                    <div className="space-y-2 border-t border-brand-100 pt-4 mb-6">
                      <div className="flex justify-between text-sm text-brand-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm text-brand-500">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? <span className="font-medium text-brand-900">Free</span> : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-brand-900 pt-2 border-t border-brand-200">
                        <span>Total</span><span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-brand-900 text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-brand-800 transition-colors"
                    >
                      Confirm Order
                    </button>
                    <p className="text-center text-xs text-brand-400 mt-3">This is a demo checkout. No real payment is processed.</p>
                  </motion.div>
                ) : (
                  <motion.div key="receipt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Receipt order={order} onClose={handleClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
