const items = ['Free Returns', 'Premium Quality', 'Worldwide Shipping', 'Sustainable Fabrics', 'New Drops Weekly', 'Expert Tailoring'];
const doubled = [...items, ...items, ...items];

export default function MarqueeTicker({ dark = false }) {
  return (
    <div className={`overflow-hidden py-4 ${dark ? 'bg-brand-900' : 'bg-white border-t border-b border-brand-100'}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-4 mx-8 text-xs uppercase tracking-widest font-medium ${dark ? 'text-white/50' : 'text-brand-400'}`}>
            {item}
            <span className={`w-1 h-1 rounded-full ${dark ? 'bg-white/20' : 'bg-brand-200'}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
