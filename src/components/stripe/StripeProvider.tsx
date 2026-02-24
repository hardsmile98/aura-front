import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY ?? '');

type Props = {
  children: React.ReactNode;
};

export function StripeProvider({ children }: Props) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
