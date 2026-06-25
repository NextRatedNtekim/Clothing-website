import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '../components/ui/SectionLabel';
import MarqueeTicker from '../components/ui/MarqueeTicker';
import { blogPosts } from '../assets/data/product';

const extraPosts = [
  {
    id: 4,
    slug: 'the-quiet-luxury-movement-explained',
    category: 'Trend Report',
    title: 'The quiet luxury movement explained',
    excerpt: 'What does it mean to dress quietly? We break down the philosophy behind the movement reshaping global fashion.',
    readTime: '6 min read',
    date: 'Oct 15, 2025',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
  },
  {
    id: 5,
    slug: 'five-fabrics-worth-investing-in-this-winter',
    category: 'Buying Guide',
    title: 'Five fabrics worth investing in this winter',
    excerpt: 'Not all fabrics are equal. These five choices deliver warmth, durability, and the kind of look that ages gracefully.',
    readTime: '4 min read',
    date: 'Sep 08, 2025',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',
  },
  {
    id: 6,
    slug: 'styling-oversized-pieces-without-losing-shape',
    category: 'Style Guide',
    title: 'Styling oversized pieces without losing shape',
    excerpt: 'Oversized clothing can overwhelm if not worn with intention. Here is how to balance volume and structure.',
    readTime: '5 min read',
    date: 'Aug 20, 2025',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
  },
];

const allPosts = [...blogPosts, ...extraPosts];

export default function Blog() {
  const [featured, ...rest] = allPosts;

  return (
    <>
      {/* Page header */}
      <section className="py-20 lg:py-24 bg-stone-950 text-white relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <SectionLabel label="Style Journal" />
          <h1 className="text-4xl lg:text-6xl font-display font-semibold mb-4">
            Our Blog
          </h1>
          <p className="text-stone-400 max-w-md mx-auto text-base">
            Style guides, trend breakdowns, and wardrobe advice from the Wearix team.
          </p>
        </div>
      </section>

      <MarqueeTicker />

      {/* Featured post */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <Link to={`/blog/${featured.slug}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="aspect-[16/10] lg:aspect-auto lg:h-[480px] overflow-hidden bg-stone-100">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">{featured.category}</span>
                    <span className="text-stone-200 text-xs">|</span>
                    <span className="text-xs text-stone-400">{featured.readTime}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900 leading-tight mb-4 group-hover:text-stone-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-stone-500 leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors">
                    Read full article
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>

      {/* Rest of posts */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="border-t border-stone-100 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {rest.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-stone-100 mb-5">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">{post.category}</span>
                      <span className="text-stone-200 text-xs">|</span>
                      <span className="text-xs text-stone-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-stone-900 font-display font-semibold text-xl leading-snug mb-3 group-hover:text-stone-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-600">
                      Read article
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
