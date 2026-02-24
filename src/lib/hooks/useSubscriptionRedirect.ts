import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { useGetProfileQuery } from '@/lib/api/userApi';

type Result = {
  showSubscriptionModal: boolean;
};

/**
 * Returns redirect destination based on auth and subscription status.
 * - guest: for landing, soulmate, email, promo-code. Authorized users redirect to paywall or app.
 * - app: for /app routes. Unauthorized -> home, authorized+no sub -> paywall.
 * - paywall: for landing-paywall. Authorized+sub -> app.
 */
export function useSubscriptionRedirect(): Result {

  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  const { data: profile } = useGetProfileQuery(undefined, { skip: !isAuthorized });

  const subscription = profile?.subscription;

  return {
    showSubscriptionModal: subscription === 'inactive',
  }
}
