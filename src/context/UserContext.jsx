"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const fetchUser = async (email) => {
    try {
      const res = await axios.get(`/api/get-user-data?email=${email}`);
      if (res.status === 200) {
        setUserData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserContext.Provider value={{ userData, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
