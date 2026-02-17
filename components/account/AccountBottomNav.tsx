'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { HoroscopeIcon, ExpertIcon } from '@/components/icons';

export function AccountBottomNav() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale).account;

  const basePath = `/${locale}/app`;
  const isHoroscopes = pathname?.includes('/horoscopes');
  const isExpert = pathname?.includes('/expert');

  const linkClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 py-2 px-4 flex-1 min-w-0 transition-colors ${
      active ? 'text-violet-600' : 'text-zinc-500'
    }`;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200"
      aria-label="Main navigation"
    >
      <div className="flex">
        <Link
          href={`${basePath}/horoscopes`}
          className={linkClass(!!isHoroscopes)}
          aria-current={isHoroscopes ? 'page' : undefined}
        >
          <HoroscopeIcon className="w-6 h-6 shrink-0" />
          <span className="text-xs font-medium truncate w-full text-center">
            {t.horoscopes}
          </span>
        </Link>
        <Link
          href={`${basePath}/expert`}
          className={linkClass(!!isExpert)}
          aria-current={isExpert ? 'page' : undefined}
        >
          <ExpertIcon className="w-6 h-6 shrink-0" />
          <span className="text-xs font-medium truncate w-full text-center">
            {t.expertHelp}
          </span>
        </Link>
      </div>
    </nav>
  );
}
