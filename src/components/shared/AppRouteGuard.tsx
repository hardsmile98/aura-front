import { useState } from 'react';
import { useSubscriptionRedirect } from '@/lib/hooks/useSubscriptionRedirect';
import { SubscriptionExpiredModal } from '@/components/app/SubscriptionExpiredModal';

type Props = {
  children: React.ReactNode;
};

export function AppRouteGuard({ children }: Props) {
  const [modalDismissed, setModalDismissed] = useState(false);

  const { showSubscriptionModal } = useSubscriptionRedirect();

  const showModal = showSubscriptionModal && !modalDismissed;

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
