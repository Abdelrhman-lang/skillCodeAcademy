"use client";
import Image from "next/image";
import { CartContext } from "../../../context/CartContext";
import { OrderContext } from "../../../context/OrderContext";
import { useContext } from "react";
import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "../../../components/ui/button";
import { UserContext } from "../../../context/UserContext";
import Spinner from "../../../components/ui/Spinner";
import Swal from "sweetalert2";

export default function CartPageClient({
  emptyCartTitle,
  viewCoursesBtn,
  cartTitle,
  categorty,
  price,
  subTotal,
  theVat,
  total,
  createOrderBtn,
}) {
  const { userCart, deleteFromCart, loading } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const { userData } = useContext(UserContext);

  const params = useParams();
  const locale = params.locale;

  const totalPrice = userCart.reduce((acc, course) => {
    return acc + Number(course.productPrice);
  }, 0);
  const vat = 10;

  const handleCreateOrder = async () => {
    if (!userData?.id || userCart.length === 0) {
      alert("Please make sure you have items in your cart and are logged in");
      return;
    }

    try {
      const items = userCart.map((course) => ({
        productId: course.productId,
        price: Number(course.productPrice),
      }));

      const payload = {
        userId: userData?.id,
        items: items,
      };

      const result = await createOrder(payload);

      if (result.success) {
        Swal.fire({
          title: "Thank you!",
          text: "Your order created successfuly!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Oooops!",
          text: "Faild To Create Your Order!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) {
    return (
      <section className="h-screen">
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      </section>
    );
  } else if (userCart.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl">{emptyCartTitle}</h1>
            <Link
              href={`/${locale}/explore`}
              className={`${buttonVariants({
                size: "lg",
                variant: "outline",
              })} cursor-pointer mt-10`}
            >
              {viewCoursesBtn}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              {cartTitle}
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {userCart.map((course) => {
                return (
                  <li
                    key={course.cartId}
                    className="flex flex-col md:flex-row items-center gap-4"
                  >
                    <Image
                      alt="course-img"
                      src={course.productImage}
                      width={250}
                      height={250}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg text-primary font-semibold">
                        {course.productTitle}
                      </h3>
                      <dl className="mt-0.5 space-y-px text-[14px]">
                        <div>
                          <dt className="inline me-2 text-gray-500">
                            {categorty}
                          </dt>
                          <dd className="inline font-semibold">
                            {course.productCategory}
                          </dd>
                        </div>

                        <div>
                          <dt className="inline me-2 text-gray-500">{price}</dt>
                          <dd className="inline text-red-500 font-semibold">
                            ${course.productPrice}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <button
                        className="text-gray-600 transition hover:text-red-600 cursor-pointer"
                        onClick={() => deleteFromCart(course.cartId)}
                      >
                        <Trash2 className="text-sm" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>{subTotal}</dt>
                    <dd>${totalPrice}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>{theVat}</dt>
                    <dd>${vat}</dd>
                  </div>

                  <div className="flex justify-between !text-base font-bold">
                    <dt>{total}</dt>
                    <dd className="text-red-500 font-bold">
                      ${totalPrice + vat}
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end gap-4">
                  {/* <button
                    // onClick={()=> router.push(`/${locale}/checkout?amount=${totalPrice + vat}`)}

                    className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button> */}
                  <button
                    onClick={handleCreateOrder}
                    className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 cursor-pointer"
                  >
                    {createOrderBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
