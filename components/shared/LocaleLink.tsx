"use client";

import Link from "next/link";
import type { Locale } from "@/lib/translations";
import { setStoredLocale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

/**
 * Link that saves the target locale to localStorage on click.
 * Use for language switcher links.
 */
export function LocaleLink({ locale, href, className, children, onClick }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        setStoredLocale(locale);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
