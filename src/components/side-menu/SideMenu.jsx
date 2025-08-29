"use client";
import { DashboardContext } from "../../context/DashboardContext";
import { useContext, useState } from "react";
import { AdminLogin } from "../admin-login/AdminLogin";
import { AdminContext } from "../../context/AdminContext";
import { ArrowBigDown, ArrowBigLeft } from "lucide-react";

export default function SideMenu({ courses, addmins, orders }) {
  const admin = JSON.parse(localStorage.getItem("user"));
  const { admins } = useContext(AdminContext);
  const { handelTabsClick } = useContext(DashboardContext);
  const [isActive, setIsActive] = useState("courses");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const linsk = [
    { id: 1, title: courses, category: "courses" },
    { id: 2, title: addmins, category: "admins" },
    { id: 3, title: orders, category: "orders" },
  ];
  const filterAdmin = admins.filter((item) => item.email === admin.email);
  return (
    <section>
      <div className="flex  items-center justify-between lg:justify-center px-3 py-3 border border-black-100 lg:border-b-0">
        <span className=" block text-center text-sm text-gray-600 font-bold">
          Skill Code Academy
        </span>
        <span
          className="lg:hidden cursor-pointer text-primary"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        >
          {isSideMenuOpen ? <ArrowBigDown /> : <ArrowBigLeft />}
        </span>
      </div>

      <div
        className={`${
          isSideMenuOpen ? "flex" : "hidden"
        } lg:flex h-screen flex-col justify-between  border border-black-100 bg-white transition-all duration-200`}
      >
        <div className="px-4">
          <ul className="mt-6">
            {linsk.map((link) => {
              return (
                <li className="mb-5" key={link.id}>
                  <button
                    className={`w-full cursor-pointer rounded-lg  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      isActive === link.category
                        ? "bg-gray-100 font-medium text-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setIsActive(link.category);
                      handelTabsClick(link.category);
                    }}
                  >
                    {link.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sticky  justify-end inset-x-0 p-4 bottom-0 border-t border-gray-100">
          {admin ? (
            <div
              className="flex items-center gap-2 bg-white p-4"
              onClick={() => console.log(filterAdmin)}
            >
              <img
                alt=""
                src={filterAdmin[0]?.image[0]?.url}
                className="size-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">
                    {admin.username}
                  </strong>

                  <span> {admin.email} </span>
                </p>
              </div>
            </div>
          ) : (
            <AdminLogin />
          )}
        </div>
      </div>
    </section>
  );
}
