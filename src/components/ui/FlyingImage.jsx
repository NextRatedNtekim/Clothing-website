import { useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';

export default function FlyingImage() {
  const { flyingItem, cartIconRef } = useCart();
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!flyingItem || !cartIconRef.current || !imgRef.current) return;

    const img       = imgRef.current;
    const from      = flyingItem.fromRect;
    const cartRect  = cartIconRef.current.getBoundingClientRect();

    // destination: centre of cart icon
    const toX = cartRect.left + cartRect.width / 2;
    const toY = cartRect.top  + cartRect.height / 2;

    // start: centre of the card button that was clicked
    const startX = from.left + from.width  / 2;
    const startY = from.top  + from.height / 2;

    // control point: arc above both points
    const cpX = (startX + toX) / 2;
    const cpY = Math.min(startY, toY) - 160;

    const duration = 680;
    let start = null;

    // position the image at start before it appears
    img.style.left    = `${startX}px`;
    img.style.top     = `${startY}px`;
    img.style.opacity = '1';
    img.style.transform = 'translate(-50%, -50%) scale(1)';

    function step(ts) {
      if (!start) start = ts;
      const t  = Math.min((ts - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease-in-out

      // quadratic bezier
      const x = (1 - ease) ** 2 * startX + 2 * (1 - ease) * ease * cpX + ease ** 2 * toX;
      const y = (1 - ease) ** 2 * startY + 2 * (1 - ease) * ease * cpY + ease ** 2 * toY;
      const scale = 1 - ease * 0.75; // shrinks from 1 → 0.25 as it lands

      img.style.left      = `${x}px`;
      img.style.top       = `${y}px`;
      img.style.transform = `translate(-50%, -50%) scale(${scale})`;
      img.style.opacity   = t > 0.85 ? String(1 - (t - 0.85) / 0.15) : '1';

      if (t < 1) rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [flyingItem, cartIconRef]);

  if (!flyingItem) return null;

  return (
    <img
      ref={imgRef}
      src={flyingItem.image}
      alt=""
      aria-hidden="true"
      style={{
        position:  'fixed',
        zIndex:    9999,
        width:     72,
        height:    72,
        objectFit: 'cover',
        borderRadius: 4,
        pointerEvents: 'none',
        opacity: 0,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      }}
    />
  );
}
