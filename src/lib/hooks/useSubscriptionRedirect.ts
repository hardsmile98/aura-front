import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { useGetProfileQuery } from '@/lib/api/userApi';
import { isValidLocale, defaultLocale } from '@/lib/i18n';

type Mode = 'guest' | 'app' | 'paywall';

type Result = {
  isLoading: boolean;
  redirectTo: string | null;
};

/**
 * Returns redirect destination based on auth and subscription status.
 * - guest: for landing, soulmate, email, promo-code. Authorized users redirect to paywall or app.
 * - app: for /app routes. Unauthorized -> home, authorized+no sub -> paywall.
 * - paywall: for landing-paywall. Authorized+sub -> app.
 */
export function useSubscriptionRedirect(mode: Mode): Result {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const locale = localeParam && isValidLocale(localeParam) ? localeParam : defaultLocale;

  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(undefined, {
    skip: !isAuthorized,
  });

  return useMemo(() => {
    if (mode === 'guest') {
      if (!isAuthorized) return { isLoading: false, redirectTo: null };
      if (profileLoading) return { isLoading: true, redirectTo: null };
      if (profile?.subscription === 'none') {
        return { isLoading: false, redirectTo: `/${locale}/landing-paywall` };
      }
      return { isLoading: false, redirectTo: `/${locale}/app/horoscopes` };
    }

    if (mode === 'app') {
      if (!isAuthorized) return { isLoading: false, redirectTo: `/${locale}` };
      if (profileLoading) return { isLoading: true, redirectTo: null };
      if (profile?.subscription === 'none') {
        return { isLoading: false, redirectTo: `/${locale}/landing-paywall` };
      }
      return { isLoading: false, redirectTo: null };
    }

    if (mode === 'paywall') {
      if (!isAuthorized) return { isLoading: false, redirectTo: null };
      if (profileLoading) return { isLoading: true, redirectTo: null };
      if (profile?.subscription !== 'none') {
        return { isLoading: false, redirectTo: `/${locale}/app/horoscopes` };
      }
      return { isLoading: false, redirectTo: null };
    }

    return { isLoading: false, redirectTo: null };
  }, [mode, isAuthorized, profileLoading, profile?.subscription, locale]);
}
