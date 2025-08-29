"use client";

import { createContext, useState } from "react";

//create context

export const CartButtonContext = createContext();

export default function CartButtonProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <CartButtonContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartButtonContext.Provider>
  );
}
