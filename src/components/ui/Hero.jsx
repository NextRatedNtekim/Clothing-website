import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroSlides } from '../../assets/data/products';

const thumbnails = [
  { label: 'Urban', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80' },
  { label: 'Latest', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80' },
  { label: 'Premium', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80' },
  { label: 'Arctic', image: 'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?w=400&q=80' },
  { label: 'Casual', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80' },
  { label: 'Iconic', image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=80' },
  { label: 'Unique', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex">
      {/* Full-bleed background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full flex flex-col justify-end pb-16 lg:pb-24 pt-20">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-xs uppercase tracking-widest text-white/70 mb-3 border border-white/30 px-3 py-1">
                {slide.label}
              </span>
              <p className="text-white/60 text-sm mb-2">{slide.title}</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-5">
                {slide.headline}
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                {slide.subtext}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-stone-100 transition-colors"
                >
                  See all collections
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-white/60 text-white px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-white/10 transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-300 ${
                i === current ? 'bg-white w-8' : 'bg-white/30 w-4'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip — visible on large screens */}
      <div className="absolute right-0 top-0 h-full hidden xl:flex flex-col z-10 w-28">
        {thumbnails.map((thumb, i) => (
          <div key={i} className="relative flex-1 overflow-hidden group">
            <img
              src={thumb.image}
              alt={thumb.label}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-2 left-0 right-0 text-center text-white text-xs tracking-widest uppercase">
              {thumb.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
