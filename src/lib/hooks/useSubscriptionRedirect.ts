import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { useGetProfileQuery } from '@/lib/api/userApi';
import { isValidLocale, defaultLocale } from '@/lib/i18n';

type RouteType = 'guest' | 'app';

type Result = {
  isLoading: boolean;
  redirectTo: string | null;
  showSubscriptionModal: boolean;
};

/**
 * Returns redirect destination based on auth and subscription status.
 * - guest: landing, soulmate, email, promo-code. Unauthorized -> show content. Authorized+active -> app. Authorized+none -> paywall.
 * - app: /app routes. Unauthorized -> home. Authorized+none -> paywall. Authorized+active -> app. Authorized+inactive -> app + modal.
 */
export function useSubscriptionRedirect(routeType: RouteType): Result {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const locale =
    localeParam && isValidLocale(localeParam) ? localeParam : defaultLocale;

  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized,
  );

  const { data: profile, isLoading } = useGetProfileQuery(undefined, {
    skip: !isAuthorized,
  });

  const subscription = profile?.subscription;

  if (routeType === 'guest') {
    if (!isAuthorized) {
      return {
        isLoading: false,
        redirectTo: null,
        showSubscriptionModal: false,
      };
    }

    if (isLoading) {
      return {
        isLoading: true,
        redirectTo: null,
        showSubscriptionModal: false,
      };
    }

    if (subscription === 'active') {
      return {
        isLoading: false,
        redirectTo: `/${locale}/app/insights`,
        showSubscriptionModal: false,
      };
    }

    if (subscription === 'none') {
      return {
        isLoading: false,
        redirectTo: `/${locale}/landing-paywall`,
        showSubscriptionModal: false,
      };
    }

    return {
      isLoading: false,
      redirectTo: `/${locale}/app/insights`,
      showSubscriptionModal: false,
    };
  }

  if (routeType === 'app') {
    if (!isAuthorized) {
      return {
        isLoading: false,
        redirectTo: `/${locale}`,
        showSubscriptionModal: false,
      };
    }

    if (isLoading) {
      return {
        isLoading: true,
        redirectTo: null,
        showSubscriptionModal: false,
      };
    }

    if (subscription === 'none') {
      return {
        isLoading: false,
        redirectTo: `/${locale}/landing-paywall`,
        showSubscriptionModal: false,
      };
    }

    if (subscription === 'active') {
      return {
        isLoading: false,
        redirectTo: null,
        showSubscriptionModal: false,
      };
    }

    return {
      isLoading: false,
      redirectTo: null,
      showSubscriptionModal: subscription === 'inactive',
    };
  }

  return { isLoading: false, redirectTo: null, showSubscriptionModal: false };
}
