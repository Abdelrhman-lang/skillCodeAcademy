import { getLocale } from "../../../../lib/locale";
import { getDictionary } from "../../../../lib/transilation";
import CartClient from "./CartClient";

export default async function Cart() {
  const locale = await getLocale();
  const { cart } = await getDictionary(locale);
  return (
    <>
      <CartClient
        viewMyCart={cart.viewMyCart}
        clearCartLabel={cart.clearCart}
      />
    </>
  );
}
