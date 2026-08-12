import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { BUNDLES, PRODUCTS } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'mfm-cart-v3';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function enrichItem(item) {
  if (item.type === 'bundle') {
    const bundle = BUNDLES.find((b) => b.id === item.id);
    if (!bundle) return null;
    return {
      ...item,
      product: {
        id: bundle.id,
        name: bundle.name,
        price: bundle.price,
        image: bundle.image,
        tagline: `${bundle.items.length} pairs · bundle`,
      },
    };
  }

  const product = PRODUCTS.find((p) => p.id === item.id);
  if (!product) return null;
  return { ...item, type: 'product', product };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.body.classList.toggle('cart-open', isCartOpen);
  }, [isCartOpen]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const enriched = useMemo(() => cart.map(enrichItem).filter(Boolean), [cart]);

  const count = enriched.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = enriched.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const showToast = (message) => setToast(message);

  const addToCart = (id, qty = 1, { open = true, toast = true } = {}) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id && item.type !== 'bundle');
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.type !== 'bundle' ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...prev, { id, qty, type: 'product' }];
    });
    if (open) setIsCartOpen(true);
    if (toast) {
      const product = PRODUCTS.find((p) => p.id === id);
      showToast(`${product?.name || 'Item'} added to cart`);
    }
  };

  const addBundle = (bundleId, label = 'Bundle') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === bundleId && item.type === 'bundle');
      if (existing) {
        return prev.map((item) =>
          item.id === bundleId && item.type === 'bundle' ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { id: bundleId, qty: 1, type: 'bundle' }];
    });
    setIsCartOpen(true);
    showToast(`${label} added to cart`);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) => (item.id === id ? { ...item, qty } : item));
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const value = {
    cart: enriched,
    count,
    subtotal,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toggleCart: () => setIsCartOpen((v) => !v),
    addToCart,
    addBundle,
    updateQty,
    removeFromCart,
    clearCart,
    toast,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
