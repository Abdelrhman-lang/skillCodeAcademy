"use client";

import Spinner from "../../../../components/ui/Spinner";
import SectionHeader from "../../../../components/section-header/SectionHeader";
import { OrderContext } from "../../../../context/OrderContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

function OrderDetails() {
  const { id } = useParams();
  const { userOrderDetails, fetchUserOrdersDetails, loading } =
    useContext(OrderContext);
  useEffect(() => {
    fetchUserOrdersDetails(id);
  }, [id]);
  return (
    <section className="py-20">
      <div className="container">
        <div className="py-5 border-b border-black-100">
          <SectionHeader title={`Order #${id}`} />
        </div>
        <div>
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userOrderDetails?.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="group bg-white shadow-md rounded-lg"
                  >
                    <div>
                      <img
                        src={product.productImage}
                        alt="product-img"
                        className="w-full h-[270px] rounded-lg rounded-b-none"
                      />
                    </div>

                    <div className="mt-3 p-3">
                      <h3 className="font-medium text-gray-900 ">
                        {product.productTitle}
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">
                        ${product.productPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
