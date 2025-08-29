"use client";

import { useContext, useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

import OrderDetails from "./OrderDetails";
import OrdersInfo from "./OrdersInfo";
import { OrderContext } from "../../context/OrderContext";

export default function OrdersDisplay({ orderId, quantity, date, view }) {
  const { AdminOrders, fetchAdminsOrders, loading } = useContext(OrderContext);
  const [viewOrder, setViewOrder] = useState(null);
  useEffect(() => {
    fetchAdminsOrders();
  }, []);
  return (
    <section>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {viewOrder ? (
            <OrderDetails viewOrder={viewOrder} setViewOrder={setViewOrder} />
          ) : (
            <OrdersInfo
              orders={AdminOrders}
              setViewOrder={setViewOrder}
              orderId={orderId}
              quantity={quantity}
              date={date}
              view={view}
            />
          )}
        </div>
      )}
    </section>
  );
}
