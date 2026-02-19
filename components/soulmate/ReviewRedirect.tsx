"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ReviewRedirect({ locale }: { locale: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${locale}/soulmate/review/1`);
  }, [locale, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-zinc-500">...</div>
    </div>
  );
}
