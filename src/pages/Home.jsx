import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useFakeStoreProducts';
import ProductCard from '../components/ui/ProductCard';
import { ProductSkeleton } from '../components/ui/Skeletons';
import MarqueeTicker from '../components/ui/MarqueeTicker';
import TrustStrip from '../components/ui/TrustStrip';

/* ─── Hero ─── */
const slides = [
  {
    id: 1,
    label: 'New Season',
    headline: 'Premium wear for\nmodern living',
    sub: 'Discover our curated range of premium clothing made for your daily look and your best days.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1400&q=80',
  },
  {
    id: 2,
    label: 'Urban Edit',
    headline: 'Wear that moves\nwith you',
    sub: 'Crafted for the pace of modern urban living. Designed for easy style and lasting comfort.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80',
  },
  {
    id: 3,
    label: 'Essentials',
    headline: 'Built to last,\nmade to impress',
    sub: 'Premium fabrics and thoughtful construction for pieces you will reach for again and again.',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1400&q=80',
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const slide = slides[current];

  return (
    <section className="relative min-h-[88vh] flex">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full flex flex-col justify-end pb-16 lg:pb-24 pt-20">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <span className="inline-block text-xs uppercase tracking-widest text-white/70 border border-white/30 px-3 py-1 mb-4">{slide.label}</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-5 whitespace-pre-line">{slide.headline}</h1>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">{slide.sub}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-brand-900 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-brand-100 transition-colors group">
                  Shop the collection <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/about" className="inline-flex items-center gap-2 border border-white/60 text-white px-7 py-3.5 text-sm font-medium hover:bg-white/10 transition-colors">
                  Our story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-px transition-all duration-300 ${i === current ? 'bg-white w-8' : 'bg-white/30 w-4'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Product section ─── */
function ProductSection({ label, title, products, loading, slice }) {
  const items = loading ? [] : products.slice(0, slice);
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-400 mb-2">{label}</p>
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-brand-900">{title}</h2>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-900 transition-colors group shrink-0">
            See all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {loading
            ? Array.from({ length: slice }).map((_, i) => <ProductSkeleton key={i} />)
            : items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}

/* ─── Promo banners ─── */
function PromoBanners() {
  return (
    <section className="py-20 lg:py-28 bg-brand-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { label: "Men's Collection", title: "Crafted for the modern man", img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=80" },
            { label: "Women's Collection", title: "Style that speaks for itself", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80" },
          ].map((b) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden group min-h-[420px] lg:min-h-[500px] flex flex-col justify-end"
            >
              <img src={b.img} alt={b.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 lg:p-10">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-2">{b.label}</p>
                <h3 className="text-white font-display text-3xl font-semibold mb-5 leading-tight">{b.title}</h3>
                <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-brand-900 px-6 py-3 text-sm font-medium hover:bg-brand-100 transition-colors group/btn">
                  Shop Now <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Brand Story ─── */
function BrandStory() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80" alt="Wearix story" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-brand-400 mb-0.5">Founded</p>
              <p className="text-3xl font-display font-bold text-brand-900">2014</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-xs uppercase tracking-widest text-brand-400 mb-3">Our Story</p>
            <h2 className="text-3xl lg:text-5xl font-display font-semibold text-brand-900 leading-tight mb-6">Defining modern style since 2014</h2>
            <p className="text-brand-500 leading-relaxed mb-4">A decade ago we set out to redefine the modern silhouette — merging urban utility with high-end aesthetics in a collection that is resilient, beautiful, and built to last.</p>
            <p className="text-brand-500 leading-relaxed mb-8">Every piece is the product of considered design where form follows function, and simplicity is never at the cost of character.</p>
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-t border-b border-brand-100">
              {[{ v: '10+', l: 'Years' }, { v: '50k+', l: 'Customers' }, { v: '4.9', l: 'Rating' }].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl lg:text-3xl font-display font-bold text-brand-900 mb-1">{s.v}</p>
                  <p className="text-xs text-brand-400 uppercase tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 bg-brand-900 text-white px-7 py-3.5 text-sm font-medium hover:bg-brand-800 transition-colors group">
              More about us <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const testimonials = [
  { id: 1, name: 'James Carter', role: 'Creative Director', rating: 5, text: 'The quality of the collection is truly unmatched. The fabrics feel incredibly premium and the tailored fit is perfect. A very sharp look I wear every day.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: 2, name: 'Sophia Laurent', role: 'Brand Strategist', rating: 5, text: 'Every single piece exceeded my expectations. Consistent sizing, beautiful materials, and the delivery was flawless. My go-to brand now.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 3, name: 'Marcus Reed', role: 'Photographer', rating: 5, text: 'Wearix nailed the balance between comfort and style. I wore the hoodie on a long shoot and it held up beautifully. Will be back for the next drop.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 lg:py-28 bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-400 mb-3">Reviews</p>
            <h2 className="text-3xl lg:text-5xl font-display font-semibold leading-tight mb-8">What our customers are saying</h2>
            <div className="hidden lg:flex flex-col gap-3">
              {testimonials.map((t, i) => (
                <button key={t.id} onClick={() => setActive(i)} className={`flex items-center gap-4 p-4 border text-left transition-colors ${i === active ? 'border-white/40 bg-white/5' : 'border-white/10 hover:border-white/20'}`}>
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover grayscale shrink-0" />
                  <div><p className="text-sm font-medium">{t.name}</p><p className="text-xs text-brand-400">{t.role}</p></div>
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="bg-white/5 border border-white/10 p-8 lg:p-10">
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map((s) => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-display text-5xl text-white/10 leading-none mb-2 select-none">"</p>
              <p className="text-brand-200 text-lg leading-relaxed mb-8">{testimonials[active].text}</p>
              <div className="flex items-center gap-4">
                <img src={testimonials[active].avatar} alt={testimonials[active].name} className="w-12 h-12 rounded-full object-cover grayscale" />
                <div><p className="font-semibold text-white">{testimonials[active].name}</p><p className="text-sm text-brand-400">{testimonials[active].role}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─── Home page assembly ─── */
export default function Home() {
  const { products, loading } = useProducts();
  const menswear   = products.filter((p) => p.category === 'Menswear');
  const womenswear = products.filter((p) => p.category === 'Womenswear');

  return (
    <>
      <Hero />
      <MarqueeTicker />
      <ProductSection label="New Arrivals" title="Fresh from the studio" products={menswear} loading={loading} slice={4} />
      <BrandStory />
      <PromoBanners />
      <ProductSection label="Womenswear" title="The women's edit" products={womenswear} loading={loading} slice={4} />
      <MarqueeTicker dark />
      <Testimonials />
      <TrustStrip />
    </>
  );
}
