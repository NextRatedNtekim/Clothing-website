import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-5">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-xs uppercase tracking-widest text-brand-400 mb-4">Page not found</p>
        <h1 className="font-display text-8xl lg:text-[160px] font-bold text-brand-100 leading-none mb-4 select-none">404</h1>
        <p className="text-brand-500 text-base mb-8 max-w-sm mx-auto">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-brand-900 text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-brand-800 transition-colors group">
          Back to homepage
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
