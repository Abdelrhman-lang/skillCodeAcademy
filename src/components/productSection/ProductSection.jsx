import ProductList from "../productList/ProductList";
import SectionHeader from "../section-header/SectionHeader";
import CategoryBtns from "../category-btns/CategoryBtns";
import { getLocale } from "../../lib/locale";
import { getDictionary } from "../../lib/transilation";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default async function ProductSection() {
  const locale = await getLocale();
  const { home } = await getDictionary(locale);
  return (
    <section className="container pb-5">
      <div className="flex items-center justify-between mb-10">
        <SectionHeader title={home.sectionHeader.title} />
        <CategoryBtns
          all={home.categoryBtns.all}
          tech={home.categoryBtns.tech}
          markiting={home.categoryBtns.markiting}
          general={home.categoryBtns.general}
        />
      </div>
      <ProductList />
      <div className="mt-10 flex items-center justify-center">
        <Link
          href={`/${locale}/explore`}
          className={`${buttonVariants({
            size: "lg",
            variant: "outline",
          })} cursor-pointer font-semibold`}
        >
          {home.coursesBtn}
        </Link>
      </div>
    </section>
  );
}
