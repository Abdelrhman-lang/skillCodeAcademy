"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function FooterClient({
  explore,
  about,
  contact,
  locale,
  description,
  copyRight,
}) {
  const path = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const links = [
    { id: 1, title: explore, href: `/${locale}/explore` },

    { id: 3, title: about, href: `/${locale}/about` },
    { id: 4, title: contact, href: `/${locale}/contact` },
  ];
  useEffect(() => {
    if (
      path.includes("sign-in") ||
      path.includes("sign-up") ||
      path.includes("dashboard")
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [path]);
  return (
    !isLoggedIn && (
      <footer className="bg-gray-100 mt-20">
        <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
            {description}
          </p>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <Link
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href={link.href}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-20 pb-10 text-center font-semibold capitalize">
            <p>
              {copyRight} <span>&copy;</span>
            </p>
          </div>
        </div>
      </footer>
    )
  );
}
