"use client";
import { Book, Menu, ShoppingCart, XIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Routes } from "../../constants/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { useUser, UserButton } from "@clerk/nextjs";
import { CartContext } from "../../context/CartContext";
import { CartButtonContext } from "../../context/CartButtonContext";
export default function Navbar({ transilation, locale }) {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { userCart } = useContext(CartContext);
  const { setIsCartOpen } = useContext(CartButtonContext);
  const router = useRouter();
  const links = [
    {
      id: crypto.randomUUID(),
      name: transilation.explore,
      href: Routes.EXPLORE,
    },

    { id: crypto.randomUUID(), name: transilation.aboutUs, href: Routes.ABOUT },
    {
      id: crypto.randomUUID(),
      name: transilation.contactUs,
      href: Routes.CONTACT,
    },
  ];
  return (
    <nav className="flex items-center gap-10" aria-label="Global">
      <Button
        variant={"secondary"}
        className={"cursor-pointer !w-10 !h-10 lg:hidden"}
        onClick={() => setOpenMenu(true)}
      >
        <Menu />
      </Button>
      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background flex items-start lg:items-center flex-col lg:flex-row gap-10 transition-all duration-200 w-full h-full lg:w-auto lg:h-auto`}
      >
        {links.map((link) => {
          return (
            <li key={link.id}>
              <Link
                href={`/${locale}/${link.href}`}
                className={` text-gray-500 capitalize transition-colors duration-50 hover:text-primary font-semibold ${
                  pathname === `/${locale}/${link.href}`
                    ? "text-primary"
                    : "text-gray-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
        <Button
          className={"absolute top-10 right-10 lg:hidden"}
          variant={"secondary"}
          onClick={() => setOpenMenu(false)}
        >
          <XIcon />
        </Button>
        <div
          className="relative cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="text-primary" />
          <span
            className={`absolute -top-5 ${
              locale === "ar" ? "start-3" : "-end-3"
            }`}
          >
            ({userCart.length})
          </span>
        </div>
        {user ? (
          <div className="relative group">
            <UserButton
              afterSignOutUrl={`/${locale}/sign-in`}
              onSignOut={() => {
                router.replace(`/${locale}/sign-in`);
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={
                    <Book className="flex items-center justify-center w-4 h-4" />
                  }
                  onClick={() => router.push(`/${locale}/user-orders`)}
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        ) : (
          <Link
            className={`!px-8 ${buttonVariants({
              size: "lg",
            })}`}
            href={`/${locale}/sign-in?__clerk_force_email=true`}
          >
            Login
          </Link>
        )}
        <LanguageToggle />
      </ul>
    </nav>
  );
}
