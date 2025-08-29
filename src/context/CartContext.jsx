"use client";

import axios from "axios";
import { createContext, useState } from "react";
//create context

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCart, setUserCart] = useState([]);
  const addToCart = async (payload) => {
    try {
      const res = await axios.post("/api/cart", payload);
      if (res.status === 201) {
        setCart((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProducts = async (id) => {
    try {
      const res = await axios.get(`/api/fetch-cart-data?id=${id}`);
      if (res.status === 200) {
        setUserCart(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromCart = async (id) => {
    try {
      const res = await axios.delete(`/api/delete-from-cart?id=${id}`);
      if (res.status === 200) {
        setUserCart((prev) => prev.filter((item) => item.id != id));
        fetchUserProducts(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearCart = async (userId) => {
    try {
      const res = await axios.delete(`/api/clear-cart?userId=${userId}`);
      if (res.status === 200) {
        setUserCart([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        fetchUserProducts,
        userCart,
        setUserCart,
        deleteFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
