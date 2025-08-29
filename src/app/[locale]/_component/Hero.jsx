import Link from "next/link";
import { Button, buttonVariants } from "../../../components/ui/button";
import { getLocale } from "../../../lib/locale";
import { getDictionary } from "../../../lib/transilation";

export default async function Hero() {
  const locale = await getLocale();
  const { home } = await getDictionary(locale);
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center capitalize">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl typing-animation">
            {home.hero.title}
          </h1>
          <p className="text-4xl font-bold text-primary sm:text-5xl">
            {home.hero.subTitle}
          </p>
          <p className="mt-4 text-base text-pretty text-gray-700 font-bold sm:text-lg/relaxed">
            {home.hero.description}
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6 ">
            <Link
              href={`/${locale}/explore`}
              className={`${buttonVariants({
                size: "lg",
                variant: "primary",
              })} px-10 py-6 bg-primary !font-bold`}
            >
              {home.hero.getStarted}
            </Link>
            <Link
              href={`/${locale}/about`}
              className={`${buttonVariants({
                size: "lg",
                variant: "outline",
              })} px-10 py-6  !font-bold`}
            >
              {home.hero.learnMore}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
