"use client";
import React, { useContext, useEffect } from "react";
import {
  PlusCircle,
  MinusCircle,
  BadgeCheck,
  AlertOctagon,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { CartContext } from "../../../../../context/CartContext";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";

import { UserContext } from "../../../../../context/UserContext";

export default function ProductInfo({ product }) {
  const { addToCart } = useContext(CartContext);
  // const { userData, fetchUser } = useContext(UserContext);
  // const { user } = useUser();

  // const handelAddToCart = async () => {
  //   if (!userData) {
  //     return;
  //   } else if (userCart.some((item) => item.productId === product.id)) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Course Already in Cart",
  //       text: "This course is already in your cart!",
  //       confirmButtonText: "OK",
  //     });
  //     return;
  //   } else {
  //     const data = {
  //       userId: userData?.id,
  //       productId: product.id,
  //     };
  //     await addToCart(data);
  //     fetchUserProducts(userData?.id);
  //   }
  // };
  // useEffect(() => {
  //   if (!user) return;
  //   fetchUser(user?.primaryEmailAddress?.emailAddress);
  // }, [user]);
  return (
    <div>
      <h3 className="text-2xl font-bold">{product.title}</h3>
      <p className="uppercase text-gray-500 mt-4">{product.category}</p>
      <p className="my-6 text-2xl">{product.discription}</p>
      <p className="text-gray-500 flex items-center gap-3 mb-6">
        {product.instantDelivery ? (
          <BadgeCheck className="text-green-500" />
        ) : (
          <AlertOctagon className="text-red-700" />
        )}{" "}
        Eligable For Instant Delivery
      </p>
      <p className="my-6">
        Price:{" "}
        <span className="font-semibold text-red-700">${product.price}</span>
      </p>

      <div className="mt-5">
        <Button
          className={"w-full py-6 cursor-pointer"}
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
