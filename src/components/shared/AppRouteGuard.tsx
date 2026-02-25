import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSubscriptionRedirect } from '@/lib/hooks/useSubscriptionRedirect';
import { SubscriptionExpiredModal } from '@/components/app/SubscriptionExpiredModal';

type Props = {
  children: React.ReactNode;
};

export function AppRouteGuard({ children }: Props) {
  const [modalDismissed, setModalDismissed] = useState(false);

  const { isLoading, redirectTo, showSubscriptionModal } =
    useSubscriptionRedirect('app');

  const showModal = showSubscriptionModal && !modalDismissed;

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

  return (
    <>
      {children}

      <SubscriptionExpiredModal
        isOpen={showModal}
        onClose={() => setModalDismissed(true)}
      />
    </>
  );
}
