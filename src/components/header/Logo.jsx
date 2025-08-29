"use client";
import logo from "../../../public/logo.png";
import { useParams } from "next/navigation";
import { Routes } from "../../constants/constants";

import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  const params = useParams();
  const locale = params.locale;
  return (
    <Link href={`/${locale}/${Routes.ROOT}`}>
      <Image src={logo} alt="logo" width={120} height={40} priority />
    </Link>
  );
}
