'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

const userEmail = 'user@example.com';

function HoroscopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function ExpertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const navLinkClass = (active: boolean, isMobile?: boolean) =>
  isMobile
    ? `flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        active ? 'bg-violet-100 text-violet-700' : 'text-zinc-600 hover:bg-zinc-100'
      }`
    : `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
        active
          ? 'text-violet-600 border-violet-600'
          : 'text-zinc-600 border-transparent hover:text-zinc-900'
      }`;

export function AccountHeader() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale).account;

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const basePath = `/${locale}/app`;
  const isHoroscopes = pathname?.includes('/horoscopes');
  const isExpert = pathname?.includes('/expert');

  const displayEmail =
    userEmail.length > 20 ? `${userEmail.slice(0, 12)}...` : userEmail;

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    router.push(`/${locale}/landing-paywall`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <Link
        href={`${basePath}/horoscopes`}
        className={navLinkClass(!!isHoroscopes, isMobile)}
        onClick={() => setMobileMenuOpen(false)}
      >
        <HoroscopeIcon
          className={`w-5 h-5 shrink-0 ${isHoroscopes ? 'text-violet-600' : 'text-zinc-500'}`}
        />
        {t.horoscopes}
      </Link>
      <Link
        href={`${basePath}/expert`}
        className={navLinkClass(!!isExpert, isMobile)}
        onClick={() => setMobileMenuOpen(false)}
      >
        <ExpertIcon
          className={`w-5 h-5 shrink-0 ${isExpert ? 'text-violet-600' : 'text-zinc-500'}`}
        />
        {t.expertHelp}
      </Link>
    </>
  );

  return (
    <header ref={headerRef} className="bg-white shadow-sm border-b border-zinc-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Left: logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <Image
              priority
              src="/img/logo.svg"
              alt={t.logo}
              width={100}
              height={28}
              className="h-6 w-auto md:h-7"
            />
          </Link>

          {/* Center: nav tabs (desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks isMobile={false} />
          </nav>

          {/* Right: user menu */}
          <div className="flex items-center gap-2">
            {/* Mobile: hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6 text-zinc-600" />
              ) : (
                <MenuIcon className="w-6 h-6 text-zinc-600" />
              )}
            </button>

            {/* User icon + dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 hover:bg-zinc-200 cursor-pointer transition-colors"
                aria-label="User menu"
              >
                <svg
                  className="w-5 h-5 text-zinc-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 py-2 bg-white rounded-xl shadow-lg border border-zinc-200 z-50">
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-xs text-zinc-500 mb-0.5">Email</p>
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {userEmail}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 cursor-pointer transition-colors"
                  >
                    <LogoutIcon className="w-5 h-5 shrink-0 text-zinc-500" />
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: expandable nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-zinc-200">
            <nav className="flex flex-col gap-1">
              <NavLinks isMobile />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
