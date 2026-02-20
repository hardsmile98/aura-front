import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { isValidLocale, defaultLocale } from '@/lib/i18n';

type Props = {
  children: React.ReactNode;
};

/**
 * Protects app routes. Redirects to home if not authorized.
 */
export function AppRouteGuard({ children }: Props) {
  const { locale } = useParams<{ locale: string }>();

  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  if (!isAuthorized) {
    const loc = locale && isValidLocale(locale) ? locale : defaultLocale;

    return <Navigate to={`/${loc}`} replace />;
  }

  return <>{children}</>;
}
