"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

const linkClassName =
  "w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-center";

function ButtonLinkInner({ href, children }: ButtonLinkProps) {
  const searchParams = useSearchParams();

  const url = new URL(href, window.location.origin);

  url.search = searchParams.toString();

  const resolvedHref = url.pathname + url.search;

  return (
    <Link href={resolvedHref} className={linkClassName}>
      {children}
    </Link>
  );
}

export function ButtonLink(props: ButtonLinkProps) {
  return (
    <Suspense fallback={<Link href={props.href} className={linkClassName}>{props.children}</Link>}>
      <ButtonLinkInner {...props} />
    </Suspense>
  );
}
