import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckIcon, CloseIcon } from '@/components/icons';
import { StarRating } from '@/components/landing-paywall';
import { getTranslations } from '@/lib/translations';
import { isValidLocale, defaultLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/translations';
import { useGetProfileQuery } from '@/lib/api/userApi';
import { useSubscribeMutation } from '@/lib/api/paymentsApi';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SubscriptionExpiredModal({
  isOpen,
  onClose,
}: Props) {
  const { locale: localeParam } = useParams<{ locale: string }>();

  const locale = localeParam && isValidLocale(localeParam) ? localeParam : defaultLocale;

  const t = getTranslations(locale as Locale);

  const lp = t.landingPaywall;

  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !isOpen,
  });
  const [subscribe, { isLoading: isSubscribing, isSuccess: isSubscribed, error: subscribeError }] =
    useSubscribeMutation();

  const benefits = [
    lp.subscriptionExpiredBenefit1,
    lp.subscriptionExpiredBenefit2,
    lp.subscriptionExpiredBenefit3,
    lp.subscriptionExpiredBenefit4,
  ];

  const handleRestore = () => {
    const paymentMethodId = profile?.stripePaymentMethodId?.trim();
  
    if (!paymentMethodId) {
      toast.error(lp.subscriptionError);
      return;
    }

    subscribe({ paymentMethodId, locale });
  };

  useEffect(() => {
    if (isSubscribed) {
      onClose();

      toast.success(lp.subscriptionSuccess);
    }
  }, [isSubscribed, onClose, lp.subscriptionSuccess]);

  useEffect(() => {
    const getMessage = (err: unknown) => {
      if (err && typeof err === 'object' && 'data' in err) {
        const data = (err as { data?: { message?: string } }).data;
        if (typeof data?.message === 'string') return data.message;
      }
      return lp.subscriptionError;
    };

    if (subscribeError) toast.error(getMessage(subscribeError));
  }, [subscribeError, lp.subscriptionError]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
          aria-label={lp.subscriptionExpiredClose}
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Header: Join X people */}
        <div className="flex items-center justify-center gap-2 mb-2 text-center">
          <p className="text-sm text-zinc-600 text-center">
            {lp.subscriptionExpiredPeoplePrefix}{' '}
            <span className="font-bold text-violet-600">{lp.subscriptionExpiredPeopleCount}</span>{' '}
            {lp.subscriptionExpiredPeopleRest}
          </p>
        </div>
        <div className="flex justify-center mb-6">
          <StarRating size="md" />
        </div>

        {/* Main title */}
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 text-center mb-3">
          {lp.subscriptionExpiredTitle}
        </h2>
        <p className="text-sm text-zinc-600 text-center mb-6 leading-relaxed">
          {lp.subscriptionExpiredMessage}
        </p>

        {/* Benefits list */}
        <ul className="space-y-3 mb-6">
          {benefits.map((text, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-700">
              <CheckIcon className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="flex items-center justify-between py-4 px-4 rounded-xl bg-zinc-50 border border-zinc-100 mb-6">
          <span className="text-zinc-700 font-bold text-sm">
            {lp.subscriptionExpiredAccessLabel}
          </span>
          <div className="text-right">
            <span className="font-bold text-violet-600">{lp.subscriptionExpiredPriceOriginal}</span>
          </div>
        </div>

        {/* Restore button */}
        <button
          type="button"
          onClick={handleRestore}
          disabled={isSubscribing || isProfileLoading}
          className="w-full py-3.5 px-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors mb-4"
        >
          {isSubscribing || isProfileLoading
            ? lp.subscriptionProcessing
            : lp.subscriptionExpiredRestoreButton}
        </button>

        {/* Terms */}
        <p className="text-xs text-zinc-500 leading-relaxed">
          {lp.subscriptionExpiredTermsPart1}
        </p>
      </div>
    </div>
  );
}
