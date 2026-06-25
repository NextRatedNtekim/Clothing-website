import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '../components/ui/SectionLabel';
import MarqueeTicker from '../components/ui/MarqueeTicker';
import TrustStrip from '../components/ui/TrustStrip';

const team = [
  {
    name: 'Alicia Monroe',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80',
  },
  {
    name: 'James Harlow',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Fabric',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80',
  },
  {
    name: 'Tom Eriksen',
    role: 'Brand Strategist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
  },
];

const values = [
  { label: 'Quality First', text: 'Every thread, cut, and finish is held to an exacting standard. We never sacrifice material quality for cost.' },
  { label: 'Sustainable Practice', text: 'From organic cotton sourcing to reduced-waste production, we work towards a smaller environmental footprint every season.' },
  { label: 'Inclusive Design', text: 'Clothing should fit real people. Our sizing and silhouettes are designed to complement diverse bodies and lifestyles.' },
  { label: 'Timeless Over Trend', text: 'We design pieces that outlast a single season, rewarding the customer with lasting versatility and wear.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-16 lg:pb-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
          alt="About Wearix"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10">
          <SectionLabel label="Our Story" />
          <h1 className="text-4xl lg:text-6xl font-display font-semibold text-white leading-tight max-w-2xl">
            A decade of defining modern style
          </h1>
        </div>
      </section>

      <MarqueeTicker />

      {/* Story section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel label="Who We Are" />
              <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900 mb-6 leading-tight">
                Born from a love of considered craft
              </h2>
              <p className="text-stone-500 leading-relaxed mb-5">
                Wearix was founded in 2014 with a single mission: to create clothing that feels as good as it looks. We started in a small workshop in London, obsessed with fabric and proportion, and grew into a brand trusted by customers across 40 countries.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8">
                Every piece we produce is built on three principles — quality materials, honest construction, and timeless design. We do not follow seasonal trends. Instead, we invest in silhouettes that serve the wearer across years, not just weeks.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-7 py-3.5 text-sm font-medium hover:bg-stone-800 transition-colors group"
              >
                Explore our range
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80"
                  alt="Workshop"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden mt-8">
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80"
                  alt="Collection"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="mb-14">
            <SectionLabel label="What We Stand For" />
            <h2 className="text-3xl lg:text-4xl font-display font-semibold">Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-t border-white/10 pt-6"
              >
                <p className="font-display text-lg font-semibold mb-3">{v.label}</p>
                <p className="text-stone-400 text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 lg:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { value: '2014', label: 'Year Founded' },
              { value: '40+', label: 'Countries Served' },
              { value: '50k+', label: 'Happy Customers' },
              { value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-display font-bold text-stone-900 mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-stone-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="mb-12">
            <SectionLabel label="The Team" />
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900">
              The people behind Wearix
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                </div>
                <p className="font-semibold text-stone-900 text-sm">{member.name}</p>
                <p className="text-xs text-stone-400 mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
