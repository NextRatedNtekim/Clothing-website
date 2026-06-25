// import { useState, useEffect } from 'react';

// const BASE = 'https://fakestoreapi.com';

// // Map FakeStoreAPI categories to Wearix display categories
// const CATEGORY_MAP = {
//   "men's clothing":   'Menswear',
//   "women's clothing": 'Womenswear',
// };

// function normalise(raw) {
//   return {
//     id:            raw.id,
//     slug:          String(raw.id),
//     name:          raw.title,
//     price:         raw.price,
//     originalPrice: parseFloat((raw.price * 1.3).toFixed(2)),
//     image:         raw.image,
//     hoverImage:    raw.image,
//     description:   raw.description,
//     rating:        raw.rating?.rate ?? 4.5,
//     reviewCount:   raw.rating?.count ?? 0,
//     category:      CATEGORY_MAP[raw.category] ?? raw.category,
//     badge:         raw.rating?.rate >= 4.5 ? 'Best Seller' : 'New',
//   };
// }

// export function useProducts() {
//   const [products, setProducts]   = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [error, setError]         = useState(null);

//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError(null);

//     fetch(`${BASE}/products/category/men's clothing`)
//       .then((r) => { if (!r.ok) throw new Error('API error'); return r.json(); })
//       .then((mens) =>
//         fetch(`${BASE}/products/category/women's clothing`)
//           .then((r) => { if (!r.ok) throw new Error('API error'); return r.json(); })
//           .then((womens) => {
//             if (!cancelled) {
//               setProducts([...mens, ...womens].map(normalise));
//               setLoading(false);
//             }
//           })
//       )
//       .catch((err) => {
//         if (!cancelled) { setError(err.message); setLoading(false); }
//       });

//     return () => { cancelled = true; };
//   }, []);

//   return { products, loading, error };
// }

// export function useProduct(id) {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     let cancelled = false;
//     setLoading(true);
//     fetch(`${BASE}/products/${id}`)
//       .then((r) => { if (!r.ok) throw new Error('Not found'); return r.json(); })
//       .then((raw) => { if (!cancelled) { setProduct(normalise(raw)); setLoading(false); } })
//       .catch((err) => { if (!cancelled) { setError(err.message); setLoading(false); } });
//     return () => { cancelled = true; };
//   }, [id]);

//   return { product, loading, error };
// }



import { useState, useEffect } from 'react';

const BASE = 'https://ecommerce.routemisr.com/api/v1';

function normalise(raw) {
  return {
    id: raw._id,
    slug: raw._id,
    name: raw.title,
    price: raw.price,
    originalPrice: raw.priceAfterDiscount || raw.price * 1.2,
    image: raw.imageCover,
    hoverImage: raw.images?.[1] || raw.imageCover,
    description: raw.description,
    rating: raw.ratingsAverage || 4.5,
    reviewCount: raw.ratingsQuantity || 0,
    category:
  raw.category?.name === "Men's Fashion"
    ? 'Menswear'
    : raw.category?.name === "Women's Fashion"
    ? 'Womenswear'
    : raw.category?.name || 'Fashion',
    badge: raw.sold > 100 ? 'Best Seller' : 'New',
  };
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE}/products`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data.data.map(normalise));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(normalise(data.data));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return { product, loading, error };
}