import { motion } from 'framer-motion';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const features = [
  { icon: Truck,        title: 'Free Worldwide Shipping', description: 'On orders over $100' },
  { icon: RotateCcw,   title: '30-Day Free Returns',     description: 'Hassle-free policy' },
  { icon: ShieldCheck, title: 'Secure Payments',          description: 'SSL-encrypted checkout' },
  { icon: Headphones,  title: '24/7 Support',             description: 'Always here to help' },
];

export default function TrustStrip() {
  return (
    <section className="border-t border-brand-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center border border-brand-200">
                <f.icon size={20} strokeWidth={1.5} className="text-brand-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-900 mb-1">{f.title}</p>
                <p className="text-xs text-brand-400">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
