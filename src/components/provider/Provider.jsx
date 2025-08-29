"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useCallback, useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();

  const createNewUser = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.post("/api/users", {
        name: user?.fullName || "gest",
        email: user?.primaryEmailAddress.emailAddress,
      });
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user, createNewUser]);
  return <div>{children}</div>;
}

export default Provider;
