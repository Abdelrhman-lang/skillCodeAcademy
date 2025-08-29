"use client";
import { useContext, useEffect } from "react";
import OrdersInfo from "../orders-display/OrdersInfo";
import { OrderContext } from "../../context/OrderContext";
import { UserContext } from "../../context/UserContext";

export default function UserOrdersDisplay({
  orderId,
  quantity,
  date,
  view,
  locale,
  product,
}) {
  const { userOrders, loading, fetchUserOrder } = useContext(OrderContext);
  const { userData } = useContext(UserContext);
  if (userData?.id && userOrders.length === 0) {
    fetchUserOrder(userData.id);
  }
  return (
    <section>
      <>
        <OrdersInfo
          orders={userOrders}
          orderId={orderId}
          quantity={quantity}
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
