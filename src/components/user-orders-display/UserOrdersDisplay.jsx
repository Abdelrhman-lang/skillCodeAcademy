"use client";
import { useContext, useEffect } from "react";
import OrdersInfo from "../orders-display/OrdersInfo";
import { OrderContext } from "../../context/OrderContext";
import { useUser } from "@clerk/nextjs";

export default function UserOrdersDisplay({
  orderId,
  status,
  date,
  view,
  locale,
  product,
}) {
  const { userOrders, loading, fetchUserOrders } = useContext(OrderContext);
  const { user } = useUser();
  useEffect(() => {
    fetchUserOrders(user?.primaryEmailAddress?.emailAddress);
  }, [user]);
  return (
    <section>
      <>
        <OrdersInfo
          orders={userOrders}
          orderId={orderId}
          status={status}
          date={date}
          view={view}
          locale={locale}
          product={product}
          loading={loading}
        />
      </>
    </section>
  );
}
