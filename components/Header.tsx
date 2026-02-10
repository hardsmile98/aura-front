import Link from "next/link";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/translations";

type HeaderProps = {
  locale: Locale;
  homeHref?: string;
};

export function Header({ locale, homeHref }: HeaderProps) {
  const t = getTranslations(locale);

  const href = homeHref ?? `/${locale}/soulmate/welcome`;

  return (
    <header className="flex justify-between items-center px-6 py-4">
      <Link
        href={href}
        className="text-xl font-semibold text-zinc-800 dark:text-zinc-100"
      >
        {t.common.header.logo}
      </Link>
    </header>
  );
}
