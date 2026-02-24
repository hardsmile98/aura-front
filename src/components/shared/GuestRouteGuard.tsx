import { Navigate } from 'react-router-dom';
import { useSubscriptionRedirect } from '@/lib/hooks/useSubscriptionRedirect';

type Props = {
  children: React.ReactNode;
};

/**
 * Protects guest routes (landing, soulmate, email, promo-code).
 * Authorized + subscription=none -> landing-paywall.
 * Authorized + subscription!=none -> app.
 */
export function GuestRouteGuard({ children }: Props) {
  const { isLoading, redirectTo } = useSubscriptionRedirect('guest');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
