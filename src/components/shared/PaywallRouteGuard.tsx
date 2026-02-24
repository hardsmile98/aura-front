import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { useGetProfileQuery } from '@/lib/api/userApi';

type Props = {
  children: React.ReactNode;
};

/**
 * Protects landing-paywall route.
 * Unauthorized -> redirect to home.
 * Authorized + subscription=active -> redirect to app.
 * Authorized + no/other subscription -> show paywall.
 */
export function PaywallRouteGuard({ children }: Props) {
  const { locale } = useParams<{ locale: string }>();

  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  const { data: profile, isLoading } = useGetProfileQuery(undefined, {
    skip: !isAuthorized,
  });

  if (!isAuthorized) {
    return <Navigate to={locale ? `/${locale}` : '/'} replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (profile?.subscription === 'active') {
    return (
      <Navigate
        to={locale ? `/${locale}/app/insights` : '/app/insights'}
        replace
      />
    );
  }

  return <>{children}</>;
}
