import Link from 'next/link';
import { Header } from '@/components/Header';
import Image from 'next/image';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

const continueButtonClassName =
  'w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center';

const PROMO_CODE = 'AURASOUL93';

type SoulmatePromoCodePageProps = {
  locale: string;
};

export function SoulmatePromoCodePage({ locale }: SoulmatePromoCodePageProps) {
  const t = getTranslations((locale as Locale) || 'en');

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 md:py-16 max-w-lg mx-auto w-full">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 ring-1 ring-zinc-200 dark:ring-zinc-700">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <Image src="/gift.gif" alt="Gift box" width={80} height={80} />
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              {t.soulmate.result.promoTitle}
              <span className="text-violet-600 dark:text-violet-400">
                {t.soulmate.result.promoHighlight}
              </span>
            </h1>

            <div className="w-full py-4 px-4 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 font-mono font-bold text-lg tracking-wider text-center">
              {PROMO_CODE}
            </div>

            <Link
              href={`/${locale}/landing-paywall`}
              className={`${continueButtonClassName} mt-6`}>
              {t.soulmate.result.emailContinue}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
