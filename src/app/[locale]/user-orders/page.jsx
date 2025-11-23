import UserOrdersDisplay from "../../../components/user-orders-display/UserOrdersDisplay";
import SectionHeader from "../../../components/section-header/SectionHeader";
import React from "react";
import { getLocale } from "../../../lib/locale";
import { getDictionary } from "../../../lib/transilation";

export default async function UserOrders() {
  const locale = await getLocale();
  const { userOrders } = await getDictionary(locale);
  return (
    <section className="py-20">
      <div className="container">
        <div className="py-5 border-b-2 border-black-500">
          <SectionHeader title={userOrders.sectionHeader} />
        </div>

        <div className="mt-10">
          <UserOrdersDisplay
            orderId={userOrders.orderInfo.orderId}
            status={userOrders.orderInfo.status}
            date={userOrders.orderInfo.date}
            view={userOrders.orderInfo.view}
            locale={locale}
            product={userOrders.orderInfo.product}
          />
        </div>
      </div>
    </section>
  );
}
