'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon } from '@/components/icons';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { isAuthorized } from '@/lib/auth';
import { LoginModal } from './LoginModal';
import { containerClass } from '@/lib/container';

type Props = { locale: string };

const btnClass =
  'inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-violet-600 bg-transparent border-2 border-violet-600 hover:bg-violet-50 rounded-lg transition-colors';

export function HomeLandingHeader({ locale }: Props) {
  const t = getTranslations((locale as Locale) || 'en').landingHome;

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const showAppLink = mounted && isAuthorized();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className={`${containerClass} py-3 sm:py-4 flex justify-between items-center`}>
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <Image
              priority
              src="/img/logo.svg"
              alt="Aura"
              width={100}
              height={28}
              className="h-6 w-auto md:h-7"
            />
          </Link>

          <div className="flex items-center gap-3">
            {showAppLink ? (
              <Link href={`/${locale}/app`} className={btnClass}>
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
