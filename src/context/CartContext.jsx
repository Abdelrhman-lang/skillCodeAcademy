"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useState } from "react";
import Swal from "sweetalert2";
//create context

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCart, setUserCart] = useState([]);
  const { user } = useUser();
  const addToCart = async (product, quantity) => {
    try {
      const res = await axios.post("/api/post-cart", {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        productId: product.id,
        name: product.title,
        price: product.price,
        image: product.imageUrl,
        quantity: quantity || 1,
      });
      if (res.status === 200) {
        Swal.fire({
          title: "Added!",
          text: "Product Added successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUserProducts(user?.primaryEmailAddress?.emailAddress);
      }
    } catch (err) {
      console.log("Error adding to cart", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProducts = async (userEmail) => {
    try {
      const res = await axios.get(
        `/api/fetch-cart-data?userEmail=${userEmail}`
      );
      if (res.status === 200) {
        setUserCart(res.data.items);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = userCart?.reduce((acc, item) => {
    return acc + Number(item.price);
  }, 0);
  const deleteFromCart = async (courseId, userEmail) => {
    try {
      const res = await axios.delete(
        `/api/delete-from-cart?courseId=${courseId}`
      );
      if (res.status === 200) {
        setUserCart((prev) =>
          prev.filter((item) => item.productId != courseId)
        );
        fetchUserProducts(userEmail);
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
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
