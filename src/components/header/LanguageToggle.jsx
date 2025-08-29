"use client";
import { Languages } from "../../constants/constants";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";

export default function LanguageToggle() {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const switchLanguage = (newLocale) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };
  return (
    <div>
      {locale === Languages.ARABIC ? (
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => switchLanguage(Languages.ENGLISH)}
          className={"!px-8 cursor-pointer"}
        >
          English
        </Button>
      ) : (
        <Button
          size={"lg"}
          variant={"outline"}
          className={"!px-8 cursor-pointer"}
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
}
