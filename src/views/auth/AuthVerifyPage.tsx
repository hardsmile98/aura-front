import { useEffect, Suspense } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/lib/store';
import { setAuth } from '@/lib/authSlice';
import { useVerifyMutation } from '@/lib/api/authApi';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';

type AuthVerifyContentProps = {
  locale: string;
};

function AuthVerifyContent({ locale }: AuthVerifyContentProps) {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [verify, { isLoading, isSuccess, isError, data }] = useVerifyMutation();

  const t = getTranslations(toLocale(locale)).authVerify;

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) return;
  
    verify({ token, locale: toLocale(locale) });
  }, [token, verify, locale]);

  const accessToken = data?.accessToken;

  useEffect(() => {
    if (isSuccess && accessToken) {
      dispatch(setAuth(accessToken));
      navigate(`/${toLocale(locale)}/app`, { replace: true });
    }
  }, [isSuccess, accessToken, dispatch, navigate, locale]);

  const alertBase =
    'flex flex-col items-center gap-4 max-w-md w-full p-6 rounded-2xl shadow-lg border';

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
        <div className={`${alertBase} bg-red-50 border-red-200`}>
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-800 font-medium">{t.error}</p>
          </div>
          <Link
            to={`/${locale}`}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors text-center"
          >
            {t.goHome}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
        <div className={`${alertBase} bg-white border-zinc-200`}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-700 font-medium">{t.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
        <div className={`${alertBase} bg-emerald-50 border-emerald-200`}>
          <div className="flex flex-col items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-emerald-800 font-medium">{t.success}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
        <div className={`${alertBase} bg-red-50 border-red-200`}>
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-800 font-medium">{t.error}</p>
          </div>
          <Link
            to={`/${locale}`}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors text-center"
          >
            {t.goHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className={`${alertBase} bg-white border-zinc-200`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-700 font-medium">{t.loading}</p>
        </div>
      </div>
    </div>
  );
}

type AuthVerifyPageProps = {
  locale: string;
};

export function AuthVerifyPage({ locale }: AuthVerifyPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
          <div className="flex items-center gap-3 p-6 rounded-2xl shadow-lg border border-zinc-200 bg-white">
            <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-700 font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <AuthVerifyContent locale={locale} />
    </Suspense>
  );
}
