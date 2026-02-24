import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateSetupIntentMutation, useSubscribeMutation } from '@/lib/api/paymentsApi';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#27272a',
      '::placeholder': { color: '#a1a1aa' },
    },
    invalid: {
      color: '#dc2626',
    },
  },
};

type Props = {
  locale: string;
  onSuccess?: () => void;
};

export function SubscribeForm({ locale, onSuccess }: Props) {
  const stripe = useStripe();

  const elements = useElements();

  const [cardComplete, setCardComplete] = useState(false);

  const [cardError, setCardError] = useState<string | null>(null);

  const [isConfirmingCard, setIsConfirmingCard] = useState(false);

  const [createSetupIntent, {
    data: setupIntentData,
    error: createSetupIntentError,
    isLoading: isCreatingSetupIntent,
  }] = useCreateSetupIntentMutation();

  const [subscribe, {
    isSuccess: isSubscribed,
    error: subscribeError,
    isLoading: isSubscribing,
  }] = useSubscribeMutation();

  const t = getTranslations(toLocale(locale));

  const lp = t.landingPaywall;

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);

    setCardError(event.error?.message ?? null);
  };

  const handleSubscribe = () => {
    if (!stripe || !elements) return;
  
    createSetupIntent({ locale });
  };

  // После получения clientSecret — подтверждаем карту и создаём подписку
  useEffect(() => {
    const clientSecret = setupIntentData?.clientSecret;
    if (!clientSecret || !stripe || !elements) return;

    const run = async () => {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return;
      }

      setIsConfirmingCard(true);

      try {
        const result = await stripe.confirmCardSetup(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (result.error) {
          toast.error(result.error.message ?? lp.subscriptionError);
          return;
        }

        const paymentMethodId =
          result.setupIntent?.payment_method?.toString() ??
          (typeof result.setupIntent?.payment_method === 'string'
            ? result.setupIntent.payment_method
            : null);

        if (!paymentMethodId) {
          toast.error(lp.subscriptionError);
          return;
        }

        subscribe({ paymentMethodId, locale });
      } finally {
        setIsConfirmingCard(false);
      }
    };

    run();
  }, [setupIntentData?.clientSecret, stripe, elements, lp.subscriptionError, subscribe]);

  // Успешная подписка
  useEffect(() => {
    if (isSubscribed) {
      onSuccess?.();
      toast.success(lp.subscriptionSuccess);
    }
  }, [isSubscribed, onSuccess, lp.subscriptionSuccess]);

  // Ошибки — показываем message из ответа API или дефолтную ошибку
  useEffect(() => {
    const getMessage = (err: unknown) => {
      if (err && typeof err === 'object' && 'data' in err) {
        const data = (err as { data?: { message?: string } }).data;
        if (typeof data?.message === 'string') return data.message;
      }
      return lp.subscriptionError;
    };
  
    if (createSetupIntentError) toast.error(getMessage(createSetupIntentError));
  
    if (subscribeError) toast.error(getMessage(subscribeError));
  }, [createSetupIntentError, subscribeError, lp.subscriptionError]);

  const loading =
    isCreatingSetupIntent ||
    isConfirmingCard ||
    isSubscribing;

  const isButtonDisabled =
    loading ||
    !stripe ||
    !elements ||
    !cardComplete ||
    !!cardError;

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleCardChange}
        />
      </div>

      <button
        type="button"
        onClick={handleSubscribe}
        disabled={isButtonDisabled}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
      >
        <svg
          className="w-5 h-5 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
        </svg>
        {loading ? lp.subscriptionProcessing : lp.subscriptionBuyButton}
      </button>
    </div>
  );
}
