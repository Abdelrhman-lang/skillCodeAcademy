"use client";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRouteGuard() {
  const { isLoaded, isSignedIn } = useUser();
  const { locale } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace(`/${locale}/sign-in`);
    }
  }, [isLoaded, isSignedIn, locale]);

  // أثناء التحميل أو التوجيه، مش هنرجع أي حاجة
  if (!isLoaded || !isSignedIn) return null;

  return null;
}
