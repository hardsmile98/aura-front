'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { ACCOUNT_MENU_ITEMS } from './accountMenuConfig';

export function AccountBottomNav() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale);

  const basePath = `/${locale}/app`;

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
        {ACCOUNT_MENU_ITEMS.map(({ path, labelKey, Icon }) => {
          const isActive = pathname?.includes(`/${path}`) ?? false;
          return (
            <Link
              key={path}
              href={`${basePath}/${path}`}
              className={linkClass(isActive)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="text-xs font-medium truncate w-full text-center">
                {t.account[labelKey]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
