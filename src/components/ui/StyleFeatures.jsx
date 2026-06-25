import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionLabel from './SectionLabel';
import { styleFeatures } from '../../assets/data/products';

function StyleCard({ item, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front face */}
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={item.frontImage}
            alt={item.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-display font-semibold text-lg leading-tight">{item.title}</p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 aspect-[3/4] overflow-hidden bg-stone-900 flex flex-col justify-end p-5"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img
            src={item.backImage}
            alt={item.title + ' back'}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          <div className="relative z-10">
            <p className="text-white font-display font-semibold text-xl mb-2">{item.title}</p>
            <p className="text-stone-300 text-sm leading-relaxed mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs border border-white/30 text-white/70 px-2.5 py-1 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StyleFeatures() {
  return (
    <section className="py-20 lg:py-28" id="styles">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel label="Wearix Styles" />
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900">
              Styles for every look
            </h2>
          </div>
          <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
            Hover any card to reveal the full style story behind each look.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {styleFeatures.map((item, i) => (
            <StyleCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
