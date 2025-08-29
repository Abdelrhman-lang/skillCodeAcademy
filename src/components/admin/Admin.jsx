"use client";
import { useContext } from "react";
import Spinner from "../ui/Spinner";
import AdminCard from "./AdminCard";
import { AdminContext } from "../../context/AdminContext";
export default function Admin() {
  const { admins, loading } = useContext(AdminContext);
  return (
    admins && (
      <main className="">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {admins.map((admin) => {
              return <AdminCard admin={admin} key={admin.id} />;
            })}
          </div>
        )}
      </main>
    )
  );
}
