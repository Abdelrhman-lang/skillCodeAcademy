import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Spinner from "../ui/Spinner";
import Link from "next/link";
export default function OrdersInfo({
  orders,
  orderId,
  status,
  date,
  view,
  locale,
  loading,
}) {
  return (
    <>
      <div className="hidden md:grid grid-cols-4 font-bold text-primary mb-4 text-center">
        <span>{orderId}</span>
        <span>{status}</span>
        <span>{date}</span>
        <span>{view}</span>
      </div>
      <div className="flex flex-col gap-5">
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-3xl text-accent">
            No Products Found
          </div>
        ) : (
          <div>
            {orders?.map((order) => {
              return (
                <div
                  key={order.id}
                  className="grid grid-cols-1 md:grid-cols-4 items-center py-3 bg-gray-100 text-center rounded-lg mb-3"
                >
                  <span>{order.id}</span>
                  <span>{order.status}</span>
                  <span>{order.createdAt.slice(0, 10)}</span>
                  <Link href={`/${locale}/orders/${order.id}`}>
                    <span className="flex items-center justify-center">
                      {locale === "ar" ? (
                        <ArrowBigLeft className="cursor-pointer  hover:text-primary" />
                      ) : (
                        <ArrowBigRight className="cursor-pointer  hover:text-primary transition-colors duration-200" />
                      )}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
