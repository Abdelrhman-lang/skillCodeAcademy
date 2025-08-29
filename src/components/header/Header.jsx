"use client";
import Navbar from "./Navbar";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ locale, transilation }) {
  const path = usePathname();
  const [isLoggedin, setLoggedin] = useState(false);
  useEffect(() => {
    if (
      path.includes("sign-in") ||
      path.includes("sign-up") ||
      path.includes("dashboard")
    ) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }, [path]);
  return (
    !isLoggedin && (
      <header className="bg-white pt-4">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <Navbar transilation={transilation} locale={locale} />
          </div>
        </div>
      </header>
    )
  );
}
