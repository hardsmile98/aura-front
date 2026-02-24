import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { useLeadMutation } from '@/lib/api/authApi';
import { setAuth } from '@/lib/auth';
import { clearQuizResult } from '@/lib/store';
import type { RootState } from '@/lib/store';
import type { AppDispatch } from '@/lib/store';

const inputClassName =
  'w-full min-w-0 max-w-full py-4 px-4 rounded-2xl border-2 border-zinc-200 bg-white text-zinc-900 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all text-base min-w-auto';
const continueButtonClassName =
  'w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center';

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

type SoulmateEmailFormProps = {
  locale: string;
};

export function SoulmateEmailForm({ locale }: SoulmateEmailFormProps) {
  const [email, setEmail] = useState('');

  const [lead, { isLoading, isSuccess, data: leadData }] = useLeadMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const quizResult = useSelector((state: RootState) => state.quiz);

  const t = getTranslations(toLocale(locale));

  useEffect(() => {
    if (!quizResult) {
      navigate(`/${locale}/soulmate/quiz`, { replace: true });
    }
  }, [quizResult, navigate, locale]);

  if (!quizResult) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    

    lead({
      email: email.trim(),
      locale,
      quizResult: quizResult as Record<string, unknown>,
    });
  };

  useEffect(() => {
    if (isSuccess && leadData.accessToken) {
      dispatch(setAuth(leadData.accessToken));
  
      dispatch(clearQuizResult());

      navigate(`/${locale}/promo-code`, { replace: true });
    }
  }, [isSuccess, leadData, dispatch, navigate, locale]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 ring-1 ring-zinc-200">
          <div className="mb-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              <span className="text-violet-600">
                {t.soulmate.result.emailSubtitleStart}
              </span>
              <span className="text-violet-600">
                {t.soulmate.result.emailSubtitleEnd}
              </span>
            </h2>
            <p className="text-2xl font-bold">
              {t.soulmate.result.emailSubtitleQuestion}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700">
              {t.soulmate.result.emailLabel.replace('*', '')}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClassName}
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isValidEmail(email) || isLoading}
            className={continueButtonClassName}>
            {isLoading ? '...' : t.soulmate.result.emailContinue}
          </button>

          <div className="flex items-start gap-3 mt-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0v2h-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-zinc-600">
              {t.soulmate.result.emailPrivacy}
            </p>
          </div>

          <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
            {t.footer.prefix}
            <Link
              to={`/${locale}/eula`}
              className="underline hover:text-zinc-700 mx-1"
              target="_blank"
            >
              {t.footer.termsLink}
            </Link>
            {t.footer.and}
            <Link
              to={`/${locale}/privacy-notice`}
              className="underline hover:text-zinc-700 mx-1"
              target="_blank"
            >
              {t.footer.privacyLink}
            </Link>
            {t.footer.suffix}
          </p>
        </form>
      </div>
    </div>
  );
}
