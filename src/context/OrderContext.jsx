"use client";
import axios from "axios";

import { createContext, useState } from "react";

//create context

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userOrderDetails, setUserOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const createOrder = async (payload) => {
    try {
      const res = await axios.post(`/api/create-order`, payload);
      if (res.status === 200 || res.status === 201) {
        setOrders((prev) => [...prev, res.data]);
        return { success: true, data: res.data };
      }
    } catch (err) {
      console.log("Error creating order:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  const fetchUserOrder = async (userId) => {
    try {
      const res = await axios.get(`/api/get-orders?userId=${userId}`);
      if (res.status === 200) {
        setUserOrders((prev) => [...prev, ...res.data]);
        console.log(res.data);
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
        console.log(res.data);
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
        orders,
        loading,
        fetchUserOrder,
        userOrders,
        userOrderDetails,
        fetchUserOrdersDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
