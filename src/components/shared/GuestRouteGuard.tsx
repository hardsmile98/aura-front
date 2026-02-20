import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { isValidLocale, defaultLocale } from '@/lib/i18n';

type Props = {
  children: React.ReactNode;
};

/**
 * Protects guest routes (landing, soulmate, etc). Redirects to app if authorized.
 */
export function GuestRouteGuard({ children }: Props) {
  const { locale } = useParams<{ locale: string }>();

  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  if (isAuthorized) {
    const loc = locale && isValidLocale(locale) ? locale : defaultLocale;

    return <Navigate to={`/${loc}/app/horoscopes`} replace />;
  }

  return <>{children}</>;
}
