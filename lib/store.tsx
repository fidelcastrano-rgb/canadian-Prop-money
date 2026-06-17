'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type ProductVariant = {
  id: string;
  name?: string;
  price: number;
  originalPrice?: number;
  savingsLabel?: string;
  qtyLabel: string;
  billCount?: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  badge?: string;
  category: string;
  image: string;
  variants: ProductVariant[];
  longDescription?: string;
  rating?: number;
  reviewCount?: number;
  coaText?: string;
  packageContents?: string[];
  storageInstructions?: string;
};

export type CartItem = {
  key: string;
  product: Product;
  variant: ProductVariant;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addToOrder: (product: Product, variant: ProductVariant) => void;
  removeItem: (key: string) => void;
  clearOrder: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToOrder = (product: Product, variant: ProductVariant) => {
    setItems((prev) => {
      const key = `${product.id}-${variant.id}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { key, product, variant, qty: 1 }];
    });
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearOrder = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.variant.price, 0);

  return (
    <CartContext.Provider value={{ items, addToOrder, removeItem, clearOrder, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
