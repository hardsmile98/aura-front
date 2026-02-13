"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const linkClassName =
  "w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-center";

function RandomReviewLinkInner({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = 1 + Math.floor(Math.random() * 5);
    const path = `/${locale}/soulmate/review/${id}`;
    router.push(search ? `${path}?${search}` : path);
  };

  return (
    <button type="button" onClick={handleClick} className={linkClassName}>
      {children}
    </button>
  );
}

export function RandomReviewLink({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <a href={`/${locale}/soulmate/review/1`} className={linkClassName}>
          {children}
        </a>
      }
    >
      <RandomReviewLinkInner locale={locale}>
        {children}
      </RandomReviewLinkInner>
    </Suspense>
  );
}
