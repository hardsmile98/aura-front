import { useParams } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { toLocale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';
import { useGetProfileQuery } from '@/lib/api/userApi';
import { useCancelSubscriptionMutation } from '@/lib/api/paymentsApi';
import { CloseIcon } from '@/components/icons';
import toast from 'react-hot-toast';

export function ProfilePage() {
  const params = useParams();

  const locale = toLocale(params?.locale);

  const t = getTranslations(locale).account;

  const { data: profile, isLoading, isError, isSuccess } = useGetProfileQuery();

  const [
    cancelSubscription,
    {
      isLoading: isCancelling,
      isSuccess: isCancelled,
      isError: isCancelError,
      error: cancelError,
    },
  ] = useCancelSubscriptionMutation();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const subscriptionActive = profile?.subscription === 'active';

  const gender = profile?.quizResult.gender || t.profileUnknown;

  const birthDate = profile?.quizResult.birthDate
    ? new Date(profile.quizResult.birthDate)
    : null;

  const formattedBirthDate = birthDate
    ? birthDate.toLocaleDateString()
    : t.profileUnknown;

  const handleCancelSubscription = useCallback(() => {
    cancelSubscription({ locale });
  }, [locale]);

  useEffect(() => {
    if (isCancelled) {
      setCancelModalOpen(false);

      toast.success(t.cancelSubscriptionSuccess);
    }
  }, [isCancelled, t]);

  useEffect(() => {
    if (isCancelError) {
      toast.error(
        (cancelError as { data?: { message?: string } })?.data?.message ??
          t.cancelSubscriptionError,
      );
    }
  }, [isCancelError, cancelError, t.cancelSubscriptionError]);

  useEffect(() => {
    if (!cancelModalOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCancelModalOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [cancelModalOpen]);

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
        {t.profileTitle}
      </h1>
      <p className="text-sm text-zinc-500 mb-8">{t.profileSubtitle}</p>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
        {isLoading && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-10 h-10 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-violet-600 font-medium text-center">
              {t.profileLoading}
            </p>
            <p className="text-zinc-500 text-sm text-center">
              {t.profileLoadingHint}
            </p>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <p className="text-red-600 font-medium mb-1">{t.profileError}</p>
            <p className="text-zinc-500 text-sm">{t.profileErrorHint}</p>
          </div>
        )}

        {isSuccess && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                {t.profileEmailLabel}
              </label>
              <div className="w-full px-4 py-3 rounded-xl bg-zinc-50 text-sm text-zinc-900 border border-zinc-200">
                {profile.email}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                  {t.profileGenderLabel}
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-zinc-50 text-sm text-zinc-900 border border-zinc-200">
                  {gender === 'male' ? t.profileGenderMale : t.profileGenderFemale}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                  {t.profileBirthDateLabel}
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-zinc-50 text-sm text-zinc-900 border border-zinc-200">
                  {formattedBirthDate}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">
                {t.profileSubscriptionLabel}
              </label>
              <div
                className={`w-full px-4 py-3 rounded-xl text-sm border font-medium ${
                  subscriptionActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200'
                }`}>
                {subscriptionActive
                  ? t.profileSubscriptionActive
                  : t.profileSubscriptionInactive}
              </div>

              {subscriptionActive && (
                <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                  {t.profileSubscriptionDescription}{' '}
                  <button
                    type="button"
                    className="text-zinc-500 cursor-pointer font-medium hover:text-zinc-700"
                    onClick={() => setCancelModalOpen(true)}>
                    {t.cancelSubscription}
                  </button>
                  .
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {cancelModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={(e) =>
            e.target === e.currentTarget && setCancelModalOpen(false)
          }>
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setCancelModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close">
              <CloseIcon className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-zinc-900 mb-3 pr-8">
              {t.cancelSubscriptionConfirmTitle}
            </h2>
            <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
              {t.cancelSubscriptionConfirmMessage}
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors">
                {isCancelling ? '...' : t.cancelSubscriptionConfirm}
              </button>
              <button
                type="button"
                onClick={() => setCancelModalOpen(false)}
                className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium rounded-xl transition-colors">
                {t.cancelSubscriptionConfirmBack}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
