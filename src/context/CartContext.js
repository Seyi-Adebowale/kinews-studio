import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "kinews_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = (product, opts = {}) => {
    const {
      size = product.size || "A4",
      qty = 1,
    } = opts;

    const key = `${product.id}__${size}`;

    setItems((prev) => {
      const found = prev.find((x) => x.key === key);
      if (found) {
        return prev.map((x) =>
          x.key === key ? { ...x, qty: x.qty + qty } : x,
        );
      }

      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: Number(product.price || 0),
          image: product.image || "",
          size,
          qty,
        },
      ];
    });
  };

  const removeItem = (key) => setItems((prev) => prev.filter((x) => x.key !== key));

  const updateQty = (key, qty) => {
    const q = Math.max(1, Number(qty) || 1);
    setItems((prev) => prev.map((x) => (x.key === key ? { ...x, qty: q } : x)));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, x) => sum + x.price * x.qty, 0);
    const count = items.reduce((sum, x) => sum + x.qty, 0);
    return { subtotal, count };
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clearCart, totals }),
    [items, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}