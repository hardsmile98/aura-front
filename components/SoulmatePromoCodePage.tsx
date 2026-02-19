import Link from 'next/link';
import { Header } from '@/components/Header';
import Image from 'next/image';
import { getTranslations } from '@/lib/translations';
import { containerClass, containerFormClass } from '@/lib/container';
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
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <Header />

      <main className={`flex-1 flex flex-col items-center py-8 md:py-16 w-full ${containerClass}`}>
        <div className={`${containerFormClass} w-full`}>
          <div className="flex flex-col items-center mb-8">
            <span className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/60 md:size-28">
              <Image src="/img/gift.gif" alt="Gift box" width={80} height={80} className="size-16 shrink-0 object-contain md:size-20" />
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 text-center mb-8">
            {t.soulmate.result.promoTitle}
            <span className="text-violet-600">
              {t.soulmate.result.promoHighlight}
            </span>
          </h2>

          <div className="w-full py-4 px-4 rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-100 text-zinc-900 font-mono font-bold text-lg tracking-wider text-center mb-6">
            {PROMO_CODE}
          </div>

          <Link
            href={`/${locale}/landing-paywall`}
            className={continueButtonClassName}>
            {t.soulmate.result.emailContinue}
          </Link>
        </div>
      </main>
    </div>
  );
}
