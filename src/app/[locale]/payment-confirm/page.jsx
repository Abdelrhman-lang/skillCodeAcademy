"use client";
import axiosInstance from "../../../lib/axios";
import { CartContext } from "../../../context/CartContext";
import { OrderContext } from "../../../context/OrderContext";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { buttonVariants } from "../../../components/ui/button";
import Spinner from "../../../components/ui/Spinner";

function PaymentConfirm() {
  const params = useParams();
  const locale = params.locale;
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");

    if (paymentIntent && user) {
      const fetchAndCreateOrder = async () => {
        try {
          // ✅ Fetch cart directly (بدل الاعتماد على state)
          const res = await axiosInstance.get(
            `carts?filters[email][$eq]=${user.primaryEmailAddress.emailAddress}&populate[products][populate]=image`
          );

          const cartData = res.data.data;

          const courses = cartData.flatMap((item) => item.products);
          const productsId = courses.map((course) => course.documentId); // أو course.documentId حسب Strapi setup
          const amount = courses.reduce((acc, item) => acc + item.price, 0);

          const orderPayload = {
            username: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            amount,
            products: productsId,
          };
          if (cartData.length !== 0) {
            createOrder(orderPayload);
          }

          clearCart(user.primaryEmailAddress.emailAddress);
        } catch (err) {
          console.error("Error during order creation:", err);
        }
      };

      fetchAndCreateOrder();
    }
  }, [user]);

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center px-5 mt-4 ">
        {user ? (
          <>
            <h2 className="text-4xl capitalize text-center">
              Thank you {user.fullName} , your payment is successful ✅
            </h2>
            <h3 className="text-[17px] text-center mt-6 text-gray-500">
              We sent an email with your order confirmation along with Digital
              Content
            </h3>
            <div className="mt-6 flex gap-5 items-center">
              <Link
                href={`/${locale}/`}
                className="p-2  text-white rounded-md bg-primary"
              >
                Go to Home
              </Link>
              <Link
                href={`/${locale}/orders`}
                className={`${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}`}
              >
                Your Orders
              </Link>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
}

export default PaymentConfirm;
