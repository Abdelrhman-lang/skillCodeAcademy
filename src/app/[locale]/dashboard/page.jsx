import React from "react";
import DashboardClient from "./DashboardClient";
import { getLocale } from "../../../lib/locale";
import { getDictionary } from "../../../lib/transilation";

export default async function DashboardPage() {
  const locale = await getLocale();
  const { dashboard } = await getDictionary(locale);
  return (
    <DashboardClient
      sectionTitle={dashboard.sectionHeader}
      logOut={dashboard.btns.logout}
      addCourse={dashboard.btns.addCourse}
      addAdmin={dashboard.btns.addAdmin}
      courses={dashboard.sideMenu.courses}
      admins={dashboard.sideMenu.admins}
      orders={dashboard.sideMenu.orders}
      editCourse={dashboard.btns.editCourse}
      deleteCourse={dashboard.btns.deleteCourse}
      orderId={dashboard.orderInfo.orderId}
      quantity={dashboard.orderInfo.quantity}
      date={dashboard.orderInfo.date}
      view={dashboard.orderInfo.view}
    />
  );
}
