import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { UserCircleIcon } from '@/components/icons';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { LoginModal } from './LoginModal';
import { containerClass } from '@/lib/container';

type Props = { locale: string };

const btnClass =
  'inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-violet-600 bg-transparent border-2 border-violet-600 hover:bg-violet-50 rounded-lg transition-colors';

export function HomeLandingHeader({ locale }: Props) {
  const t = getTranslations(toLocale(locale)).landingHome;
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const showAppLink = isAuthorized;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className={`${containerClass} py-3 sm:py-4 flex justify-between items-center`}>
          <Link to={`/${locale}`} className="flex items-center shrink-0">
            <img
              src="/img/logo.svg"
              alt="Aura"
              className="h-6 w-auto md:h-7"
            />
          </Link>

          <div className="flex items-center gap-3">
            {showAppLink ? (
              <Link to={`/${locale}/app`} className={btnClass}>
                <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {t.logIn}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className={btnClass}
              >
                <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {t.logIn}
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal
        locale={locale}
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
