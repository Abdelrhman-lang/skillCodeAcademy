"use cilent";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import axiosInstance from "../../lib/axios";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";

export default function OrderDetails({ viewOrder, setViewOrder, userOrders }) {
  const pathname = usePathname();
  const handelDeleverdBtn = async (id) => {
    try {
      const res = await axiosInstance.put(`orders/${id}`, {
        data: {
          deliverd: true,
        },
      });
      console.log("updated", res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const sendEmail = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
    });
  };
  const { userOrderDetails, fetchUserOrdersDetails } = useContext(OrderContext);
  useEffect(() => {
    fetchUserOrdersDetails(userOrders?.id);
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-4xl font-semibold text-primary">
          Order Details
        </span>
        <Button variant={"outline"} onClick={() => setViewOrder(null)}>
          Back
        </Button>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 border-b-2 border-black-500 pb-5">
        {viewOrder.products.map((product) => {
          return (
            <div key={product.id} className="group">
              <div>
                <img
                  src={product.image.url}
                  alt="product-img"
                  className="w-[500px] h-[400px] rounded-lg"
                />
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-gray-900 ">{product.title}</h3>

                <p className="mt-1 text-sm text-gray-700">${product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <h3 className="text-4xl font-semibold text-primary">User Details</h3>
        <div className="mt-3">
          <p className="mb-3">
            <span className="text-gray-500 font-semibold">Email:</span>{" "}
            {viewOrder.email}
          </p>
          <p className="mb-3">
            <span className="text-gray-500 font-semibold">Name:</span>{" "}
            {viewOrder.username || "unkown"}
          </p>
          <p className="mb-3">
            <span className="text-gray-500 font-semibold">Amount:</span> $
            {viewOrder.amount}
          </p>
          <p className="flex items-center gap-4">
            <span className="text-gray-500 font-semibold">Status:</span>{" "}
            {pathname.includes("dashboard") ? (
              <div>
                <Button
                  variant={"outline"}
                  className={"cursor-pointer disabled:bg-green-500"}
                  onClick={() => {
                    handelDeleverdBtn(viewOrder.documentId);
                    sendEmail();
                    Swal.fire({
                      icon: "success",
                      title: "Email sent to user",
                    });
                  }}
                  disabled={viewOrder.deliverd === true}
                >
                  {viewOrder.deliverd === true ? "Deleverd" : "Not Deleverd"}
                </Button>
              </div>
            ) : (
              <span
                className={` font-semibold ${
                  viewOrder.deliverd === true
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {viewOrder.deliverd === true ? "Deleverd" : "Not Deleverd"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
