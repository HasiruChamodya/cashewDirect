import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById } from '../data/products';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'cd_wishlist';

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
  }, [productIds]);

  function toggle(productId) {
    setProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  function remove(productId) {
    setProductIds((prev) => prev.filter((id) => id !== productId));
  }

  function has(productId) {
    return productIds.includes(productId);
  }

  const products = useMemo(
    () => productIds.map(getProductById).filter(Boolean),
    [productIds]
  );

  const value = { productIds, products, toggle, remove, has, count: productIds.length };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
