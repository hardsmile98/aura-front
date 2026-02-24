import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toLocale } from '@/lib/i18n';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? '');

type Props = { children: React.ReactNode };

export function StripeProvider({ children }: Props) {
  const locale = toLocale(useLocation().pathname.split('/')[1]);

  return (
    <Elements options={{ locale }} stripe={stripePromise}>
      {children}
    </Elements>
  );
}
