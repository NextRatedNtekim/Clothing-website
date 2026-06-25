import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { blogPosts } from '../../assets/data/products';

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`}>
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden bg-stone-100 mb-5">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">{post.category}</span>
          <span className="text-stone-200 text-xs">|</span>
          <span className="text-xs text-stone-400">{post.readTime}</span>
          <span className="text-stone-200 text-xs">|</span>
          <span className="text-xs text-stone-400">{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-stone-900 font-display font-semibold text-xl leading-snug mb-3 group-hover:text-stone-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors group/link">
          Read article
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </span>
      </Link>
    </motion.article>
  );
}

export default function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel label="Style Journal" />
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-stone-900">
              From the blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors group shrink-0"
          >
            Browse all posts
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
