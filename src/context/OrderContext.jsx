"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { createContext, useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Swal from "sweetalert2";

//create context

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [userOrders, setUserOrders] = useState([]);
  const [userOrderDetails, setUserOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { fetchUserProducts } = useContext(CartContext);
  const createOrder = async () => {
    try {
      const res = await axios.post(`/api/place-order`, {
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      if (res.status === 200) {
        Swal.fire({
          title: "Thanks to choose us!",
          text: "Your Order is Created successfully!",
          icon: "success",
        });
        fetchUserProducts(user?.primaryEmailAddress?.emailAddress);
      }
    } catch (err) {
      console.log("Error when creating order:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  const fetchUserOrders = async (userEmail) => {
    try {
      const res = await axios.get(`/api/get-orders?userEmail=${userEmail}`);
      if (res.status === 200) {
        setUserOrders(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrdersDetails = async (orderId) => {
    try {
      const res = await axios.get(`/api/get-order-details?orderId=${orderId}`);
      if (res.status === 200) {
        setUserOrderDetails(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        loading,
        fetchUserOrders,
        userOrders,
        userOrderDetails,
        fetchUserOrdersDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
