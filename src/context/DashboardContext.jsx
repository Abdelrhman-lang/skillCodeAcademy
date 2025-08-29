"use client";
import { createContext, useState } from "react";

export const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
  const [category, setCategory] = useState("courses");

  const handelTabsClick = (category) => {
    setCategory(category);
  };
  return (
    <DashboardContext.Provider
      value={{ category, setCategory, handelTabsClick }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
