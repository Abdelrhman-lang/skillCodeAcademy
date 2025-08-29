"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { OrderContext } from "../../../../context/OrderContext";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "../../../../context/CartContext";

const CheckoutForm = ({ amount }) => {
  const params = useParams();
  const locale = params.locale;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState();
  const { createOrder } = useContext(OrderContext);
  const { user } = useUser();
  const { userCart, clearCart } = useContext(CartContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const clientSecret = await res.json();

    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/${locale}/payment-confirm`,
      },
    });

    if (result.error) {
      handleError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-12">
        <PaymentElement />
        <button className="w-full p-2 mt-4 text-white rounded-md bg-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
