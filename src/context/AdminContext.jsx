"use client";
import { createContext } from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
export const AdminContext = createContext();

import React from "react";

export default function AdminProvider({ children }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get("/admins?populate=*");
      setAdmins(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);
  return (
    <AdminContext.Provider value={{ admins, loading }}>
      {children}
    </AdminContext.Provider>
  );
}
