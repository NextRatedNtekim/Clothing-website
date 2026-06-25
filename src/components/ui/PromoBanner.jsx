import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left card — dark */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden group min-h-[420px] lg:min-h-[520px] flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=80"
              alt="Mens collection"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 p-8 lg:p-10">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Men's Collection</p>
              <h3 className="text-white font-display text-3xl lg:text-4xl font-semibold mb-5 leading-tight">
                Crafted for the modern man
              </h3>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 text-sm font-medium hover:bg-stone-100 transition-colors group/btn"
              >
                Shop Now
                <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right card — light */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative overflow-hidden group min-h-[420px] lg:min-h-[520px] flex flex-col justify-end"
          >
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80"
              alt="Womens collection"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="relative z-10 p-8 lg:p-10">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Women's Collection</p>
              <h3 className="text-white font-display text-3xl lg:text-4xl font-semibold mb-5 leading-tight">
                Style that speaks for itself
              </h3>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3 text-sm font-medium hover:bg-stone-100 transition-colors group/btn"
              >
                Shop Now
                <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
