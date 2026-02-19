'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { UserCircleIcon, LogoutIcon } from '@/components/icons';
import { removeAuthJWT } from '@/lib/auth';
import { ACCOUNT_MENU_ITEMS } from './accountMenuConfig';
import { containerClass } from '@/lib/container';

const userEmail = 'user@example.com';

function getNavLinkClass(active: boolean, isMobile: boolean): string {
  if (isMobile) {
    return `flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      active ? 'bg-violet-100 text-violet-700' : 'text-zinc-600 hover:bg-zinc-100'
    }`;
  }

  return `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
    active
      ? 'text-violet-600 border-violet-600'
      : 'text-zinc-600 border-transparent hover:text-zinc-900'
  }`;
}

type NavLinksProps = {
  basePath: string;
  pathname: string | null;
  isMobile: boolean;
  labels: Record<string, string>;
  onLinkClick: () => void;
};

function NavLinks({ basePath, pathname, isMobile, labels, onLinkClick }: NavLinksProps) {
  return (
    <>
      {ACCOUNT_MENU_ITEMS.map(({ path, labelKey, Icon }) => {
        const isActive = pathname?.includes(`/${path}`) ?? false;
        return (
          <Link
            key={path}
            href={`${basePath}/${path}`}
            className={getNavLinkClass(isActive, isMobile)}
            onClick={onLinkClick}
          >
            <Icon
              className={`w-5 h-5 shrink-0 ${isActive ? 'text-violet-600' : 'text-zinc-500'}`}
            />
            {labels[labelKey]}
          </Link>
        );
      })}
    </>
  );
}

export function AccountHeader() {
  const params = useParams();

  const pathname = usePathname();

  const router = useRouter();

  const locale = (params?.locale as Locale) || 'en';

  const t = getTranslations(locale).account;

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const basePath = `/${locale}/app`;

  const handleLogout = useCallback(() => {
    setUserMenuOpen(false);
  
    removeAuthJWT();
  
    router.push(`/${locale}/`);
  }, [locale, router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const labels = {
    horoscopes: t.horoscopes,
    expertHelp: t.expertHelp,
  };

  return (
    <header className="bg-white shadow-sm border-b border-zinc-200 sticky top-0 z-40">
      <div className={containerClass}>
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link href={basePath} className="flex items-center shrink-0">
            <Image
              priority
              src="/img/logo.svg"
              alt={t.logo}
              width={100}
              height={28}
              className="h-6 w-auto md:h-7"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLinks
              basePath={basePath}
              pathname={pathname}
              isMobile={false}
              labels={labels}
              onLinkClick={() => {}}
            />
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 cursor-pointer transition-colors"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <UserCircleIcon className="w-5 h-5 text-zinc-600" />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 py-2 bg-white rounded-xl shadow-lg border border-zinc-200 z-50"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {userEmail}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    role="menuitem"
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer transition-colors text-left"
                  >
                    <LogoutIcon className="w-5 h-5 shrink-0 text-zinc-500" />
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
