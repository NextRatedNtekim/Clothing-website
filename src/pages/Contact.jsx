import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { InstagramIcon, TwitterIcon, FacebookIcon } from '../components/ui/SocialIcons';
import SectionLabel from '../components/ui/SectionLabel';
import MarqueeTicker from '../components/ui/MarqueeTicker';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@wearix.com', href: 'mailto:hello@wearix.com' },
  { icon: Phone, label: 'Phone', value: '+001 234 567 890', href: 'tel:+0012345678900' },
  { icon: MapPin, label: 'Location', value: 'London, England, UK', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon to Fri, 9am to 6pm GMT', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSent(true);
  };

  return (
    <>
      {/* Header */}
      <section className="py-20 lg:py-28 bg-stone-950 text-white relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <SectionLabel label="Get In Touch" />
          <h1 className="text-4xl lg:text-6xl font-display font-semibold mb-4">Contact Us</h1>
          <p className="text-stone-400 max-w-sm mx-auto">
            Have a question, a request, or just want to say hello? We would love to hear from you.
          </p>
        </div>
      </section>

      <MarqueeTicker />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <SectionLabel label="Contact Details" />
              <h2 className="text-2xl lg:text-3xl font-display font-semibold text-stone-900 mb-8 leading-snug">
                We are always happy to help
              </h2>

              <ul className="space-y-6 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-stone-200 flex items-center justify-center shrink-0">
                      <Icon size={16} strokeWidth={1.5} className="text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-stone-400 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-stone-800 hover:text-stone-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-stone-800">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://instagram.com', icon: InstagramIcon, label: 'Instagram' },
                    { href: 'https://x.com', icon: TwitterIcon, label: 'Twitter' },
                    { href: 'https://facebook.com', icon: FacebookIcon, label: 'Facebook' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              {sent ? (
                <div className="border border-stone-200 p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-14 h-14 border border-stone-900 flex items-center justify-center mb-6 mx-auto">
                    <Mail size={22} className="text-stone-900" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-stone-900 mb-2">Message received</h3>
                  <p className="text-stone-500 text-sm max-w-xs">
                    Thank you for reaching out. Our team will respond to your message within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`w-full border px-4 py-3 text-sm text-stone-900 bg-white focus:outline-none transition-colors placeholder-stone-300 ${
                          errors.name ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-stone-500'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full border px-4 py-3 text-sm text-stone-900 bg-white focus:outline-none transition-colors placeholder-stone-300 ${
                          errors.email ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-stone-500'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      className="w-full border border-stone-200 px-4 py-3 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-500 transition-colors placeholder-stone-300"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className={`w-full border px-4 py-3 text-sm text-stone-900 bg-white focus:outline-none transition-colors placeholder-stone-300 resize-none ${
                        errors.message ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-stone-500'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-900 text-white py-4 text-sm font-medium tracking-wider uppercase hover:bg-stone-800 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
