import { getDictionary } from '../../../lib/transilation'
import { getLocale } from '../../../lib/locale'
import CartPageClient from './CartPageClient'

export default async function CartPage() {
  const locale = await getLocale()
  const {cartPage} = await getDictionary(locale)
  return (
    <div>
      <CartPageClient emptyCartTitle={cartPage.emptyCartTitle} viewCoursesBtn={ cartPage.viewCoursesBtn} cartTitle={cartPage.cartTitle} categorty={cartPage.categorty} price={cartPage.price} subTotal={cartPage.subTotal} theVat={cartPage.theVat} total={cartPage.total} createOrderBtn={cartPage.createOrderBtn}/>
    </div>
  )
}
