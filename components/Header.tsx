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
    <header className="flex justify-center items-center px-6 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <Link
        href={href}
        className="text-xl font-semibold text-zinc-800 dark:text-zinc-100"
      >
        {t.common.header.logo}
      </Link>
    </header>
  );
}
