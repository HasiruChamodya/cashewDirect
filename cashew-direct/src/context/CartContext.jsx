import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProductById } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'cd_cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(productId, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { productId, qty }];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function updateQty(productId, qty) {
    if (qty < 1) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );
  }

  function clear() {
    setItems([]);
  }

  const lines = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProductById(i.productId);
          if (!product) return null;
          return { ...i, product, lineTotal: product.price * i.qty };
        })
        .filter(Boolean),
    [items]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value = {
    items,
    lines,
    subtotal,
    itemCount,
    addItem,
    removeItem,
    updateQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
