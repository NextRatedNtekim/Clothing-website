import { useState, useEffect } from 'react';

const BASE = 'https://ecommerce.routemisr.com/api/v1';

function normalise(raw) {
  return {
    id: raw._id,
    slug: raw._id,

    name: raw.title,

    price: raw.price,

    originalPrice:
      raw.priceAfterDiscount
        ? raw.price
        : Number((raw.price * 1.25).toFixed(2)),

    image: raw.imageCover,

    hoverImage:
      raw.images?.[1] ||
      raw.images?.[0] ||
      raw.imageCover,

    description: raw.description,

    rating:
      raw.ratingsAverage || 4.5,

    reviewCount:
      raw.ratingsQuantity || 0,

    category:
      raw.category?.name || 'Fashion',

    badge:
      raw.sold > 100
        ? 'Best Seller'
        : 'New',
  };
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE}/products?limit=100`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        return res.json();
      })
      .then((data) => {
        setProducts(
          data.data.map(normalise)
        );

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
    error,
  };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE}/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }

        return res.json();
      })
      .then((data) => {
        setProduct(
          normalise(data.data)
        );

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return {
    product,
    loading,
    error,
  };
}