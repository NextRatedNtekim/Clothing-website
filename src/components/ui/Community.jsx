import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { InstagramIcon } from './SocialIcons';
import { communityImages } from '../../assets/data/products';

export default function Community() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-12">
          <SectionLabel label="Community" />
          <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900 mb-3">
            Join the Wearix family
          </h2>
          <p className="text-stone-500 text-sm max-w-sm mx-auto">
            Tag us on Instagram with <span className="font-medium text-stone-700">#wearix</span> and be featured here.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 lg:gap-3">
          {communityImages.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="relative group overflow-hidden cursor-pointer aspect-square"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <InstagramIcon
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
          >
            <InstagramIcon size={16} />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
