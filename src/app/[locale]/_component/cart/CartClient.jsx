"use client";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "../../../../context/CartContext";
import { useContext, useEffect } from "react";
import { CartButtonContext } from "../../../../context/CartButtonContext";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Routes } from "../../../../constants/constants";
import { Button } from "../../../../components/ui/button";
import { UserContext } from "../../../../context/UserContext";
import Spinner from "../../../../components/ui/Spinner";

export default function CartClient({ viewMyCart, clearCartLabel }) {
  const { userCart, fetchUserProducts, deleteFromCart, clearCart, loading } =
    useContext(CartContext);
  const { userData, fetchUser } = useContext(UserContext);
  const { user } = useUser();
  const { isCartOpen, setIsCartOpen } = useContext(CartButtonContext);
  const params = useParams();
  const locale = params.locale;

  useEffect(() => {
    if (!user) return;
    fetchUser(user?.primaryEmailAddress?.emailAddress);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserProducts(userData?.id);
    } else {
      return;
    }
  }, [userData?.id]);

  return (
    user && (
      <div
        className={`fixed z-50 ${
          isCartOpen ? "end-0" : "-end-full"
        } top-0  duration-200 transition-all h-full w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 overflow-auto`}
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          onClick={() => setIsCartOpen(false)}
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110 cursor-pointer"
        >
          <span className="sr-only">Close cart</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-4 space-y-6">
          <ul className="space-y-4">
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <div>
                {userCart.map((course) => {
                  return (
                    <li
                      key={course.cartId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={course.productImage}
                          alt="cousre-img"
                          className="size-16 rounded-sm object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-primary">
                            {course.productTitle}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div className="flex items-center gap-2">
                              <dt className="inline text-gray-500">
                                Category:
                              </dt>
                              <dd className="inline">
                                {course.productCategory}
                              </dd>
                            </div>

                            <div className="flex items-center gap-2">
                              <dt className="inline text-gray-500">Price:</dt>
                              <dd className="inline">${course.productPrice}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div
                        className="cursor-pointer"
                        onClick={() => deleteFromCart(course.cartId)}
                      >
                        <Trash className="text-red-500 text-sm" />
                      </div>
                    </li>
                  );
                })}
              </div>
            )}
          </ul>

          <div className="space-y-4 text-center">
            <Link
              href={`/${locale}/${Routes.CART}`}
              className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            >
              {viewMyCart} ({userCart.length})
            </Link>

            <div>
              <Button
                className={"!bg-red-500 text-white w-full cursor-pointer"}
                onClick={() => clearCart(userData?.id)}
              >
                {clearCartLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
