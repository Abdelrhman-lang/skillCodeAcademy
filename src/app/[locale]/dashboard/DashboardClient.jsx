"use client";
import SideMenu from "../../../components/side-menu/SideMenu";
import SectionHeader from "../../../components/section-header/SectionHeader";
import React, { useContext } from "react";
import DashboardDisplay from "../_component/DashboardDisplay";
import { AddCourse } from "../../../components/add-course/AddCourse";
import { DashboardContext } from "../../../context/DashboardContext";
import Admin from "../../../components/admin/Admin";
import { AddAdmin } from "../../../components/add-admin/AddAdmin";
import { AdminLogin } from "../../../components/admin-login/AdminLogin";
import { Button } from "../../../components/ui/button";
import OrdersDisplay from "../../../components/orders-display/OrdersDisplay";

export default function DashboardClient({
  sectionTitle,
  logOut,
  addCourse,
  addAdmin,
  courses,
  admins,
  orders,
  editCourse,
  deleteCourse,
  orderId,
  quantity,
  date,
  view,
}) {
  const { category } = useContext(DashboardContext);
  const admin = JSON.parse(localStorage.getItem("user"));
  const handelLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location.reload();
  };
  return (
    <section className="container py-20">
      {admin ? (
        <div>
          <div className="flex justify-between">
            <SectionHeader title={sectionTitle} />
            <div className="flex items-center gap-4">
              {category === "courses" ? (
                <AddCourse addCourse={addCourse} />
              ) : category === "admins" ? (
                <AddAdmin addAdmin={addAdmin} />
              ) : category === "orders" ? (
                ""
              ) : (
                ""
              )}
              <Button
                className={"!bg-red-500 cursor-pointer"}
                onClick={handelLogout}
              >
                {logOut}
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row  gap-10 mt-10">
            <SideMenu courses={courses} addmins={admins} orders={orders} />

            {category === "courses" ? (
              <div className="flex flex-1 justify-center items-center">
                <DashboardDisplay
                  editCourse={editCourse}
                  deleteCourse={deleteCourse}
                />
              </div>
            ) : category === "admins" ? (
              <div className="flex flex-1">
                <Admin />
              </div>
            ) : category === "orders" ? (
              <div className="flex-1">
                <OrdersDisplay
                  orderId={orderId}
                  quantity={quantity}
                  date={date}
                  view={view}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh]">
          <div>
            <h1 className="text-4xl mb-10">
              Welcome To Skill Code Academy Dashboard
            </h1>
            <AdminLogin />
          </div>
        </div>
      )}
    </section>
  );
}
