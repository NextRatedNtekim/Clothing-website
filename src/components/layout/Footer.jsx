import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.trim()) { setDone(true); setEmail(''); }
  };

  return (
    <footer className="bg-brand-900 text-white">
      <div className="border-b border-brand-700">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-12 lg:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-400 mb-2">Newsletter</p>
            <h3 className="text-2xl lg:text-3xl font-display font-semibold">Stay in the loop</h3>
          </div>
          {done ? (
            <p className="text-brand-400 text-sm">Subscribed. Thank you.</p>
          ) : (
            <form onSubmit={handleSub} className="flex w-full lg:w-auto">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="bg-brand-800 border border-brand-700 text-white placeholder-brand-500 text-sm px-4 py-3 flex-1 lg:w-72 focus:outline-none focus:border-brand-500 transition-colors" />
              <button type="submit" className="bg-white text-brand-900 px-5 py-3 text-sm font-medium hover:bg-brand-100 transition-colors flex items-center gap-2">
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Link to="/" className="text-2xl font-display font-bold block mb-4">WEARIX</Link>
          <p className="text-brand-400 text-sm leading-relaxed mb-6 max-w-xs">Premium clothing for modern, minimalist living. Designed to last.</p>
          <Link to="/contact" className="inline-block border border-brand-600 text-brand-300 hover:border-white hover:text-white text-xs uppercase tracking-widest px-5 py-2.5 transition-colors">Contact</Link>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-400 mb-6">Quick Links</p>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.label}><Link to={l.path} className="text-brand-400 hover:text-white text-sm transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-400 mb-6">Get In Touch</p>
          <ul className="space-y-4">
            <li><a href="mailto:hello@wearix.com" className="flex items-start gap-3 text-brand-400 hover:text-white text-sm transition-colors"><Mail size={14} className="mt-0.5 shrink-0" />hello@wearix.com</a></li>
            <li><a href="tel:+0012345678900" className="flex items-start gap-3 text-brand-400 hover:text-white text-sm transition-colors"><Phone size={14} className="mt-0.5 shrink-0" />+001 234 567 890</a></li>
            <li><span className="flex items-start gap-3 text-brand-400 text-sm"><MapPin size={14} className="mt-0.5 shrink-0" />London, England</span></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-400 mb-6">Premium Promises</p>
          <ul className="space-y-3 text-sm text-brand-400">
            {['Free worldwide shipping over $100', '30-day hassle-free returns', 'SSL-secured checkout', 'Sustainably sourced fabrics'].map((p) => (
              <li key={p} className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-brand-600 mt-1.5 shrink-0" />{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-brand-500 text-xs">
          <span>2026 Wearix. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-brand-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-300 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
