'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { defaultLocale, isValidLocale } from '@/lib/i18n';

/**
 * Клиентский редирект в кабинет для авторизованных пользователей.
 * Авторизация: isAuthorized из Redux store (JWT хранится в localStorage).
 */
export function AuthRedirectToApp() {
  const pathname = usePathname();
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (pathname?.includes('/app')) return;

    if (!isAuthorized) return;

    const segments = pathname?.split('/').filter(Boolean) ?? [];
    const locale = segments[0] && isValidLocale(segments[0]) ? segments[0] : defaultLocale;

    const search = window.location.search;
    const target = `/${locale}/app${search ? `?${search}` : ''}`;
    window.location.replace(target);
  }, [pathname, isAuthorized]);

  return null;
}
