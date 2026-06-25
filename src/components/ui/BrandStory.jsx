import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video / image block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-stone-200 relative">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80"
                alt="Defining modern style"
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay text badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-4">
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-0.5">Since</p>
                <p className="text-3xl font-display font-bold text-stone-900">2014</p>
              </div>
            </div>
            {/* Decorative square */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-stone-200 -z-10 hidden lg:block" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SectionLabel label="Wearix" />
            <h2 className="text-3xl lg:text-5xl font-display font-semibold text-stone-900 leading-tight mb-6">
              Defining modern style
            </h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              A decade ago, we set out to redefine the modern silhouette. Today, we merge urban utility with high-end aesthetics in a resilient, beautiful collection.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8">
              Every piece in our catalogue is the product of considered design — where form follows function, and simplicity is never at the cost of character.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-t border-b border-stone-200">
              {[
                { value: '10+', label: 'Years in style' },
                { value: '50k+', label: 'Happy customers' },
                { value: '4.9', label: 'Average rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl lg:text-3xl font-display font-bold text-stone-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-stone-400 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-stone-800 transition-colors group"
              >
                More about us
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-7 py-3.5 text-sm font-medium tracking-wide hover:border-stone-900 hover:text-stone-900 transition-colors"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
