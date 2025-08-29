import React from "react";
import FooterClient from "./FooterClient";
import { getLocale } from "../../lib/locale";
import { getDictionary } from "../../lib/transilation";

export default async function Footer() {
  const locale = await getLocale();
  const { navbar, footer } = await getDictionary(locale);
  return (
    <FooterClient
      explore={navbar.explore}
      courses={navbar.courses}
      about={navbar.aboutUs}
      contact={navbar.contactUs}
      locale={locale}
      description={footer.description}
      copyRight={footer.copyRight}
    />
  );
}
