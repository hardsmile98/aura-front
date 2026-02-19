import Image from 'next/image';
import { Header } from '@/components/Header';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { SoulmateEmailForm } from '@/components/SoulmateEmailForm';
import { containerClass, containerFormClass } from '@/lib/container';

type SoulmateEmailPageProps = {
  locale: string;
};

export function SoulmateEmailPage({ locale }: SoulmateEmailPageProps) {
  const t = getTranslations((locale as Locale) || 'en');

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <Header />

      <main className={`flex-1 flex flex-col items-center py-8 md:py-16 w-full ${containerClass}`}>
        <div className={`${containerFormClass} w-full flex flex-col items-center`}>
        <h1 className="text-xl md:text-2xl font-bold text-zinc-900 mb-8 text-center">
          {t.soulmate.result.emailTitle}
        </h1>

        <div className="relative w-full max-w-[280px] aspect-[3/4] mx-auto">
          <Image
            src="/img/portrait.png"
            alt=""
            fill
            className="object-cover rounded-lg blur-sm grayscale"
            sizes="(max-width: 768px) 280px, 320px"
          />
        </div>
        </div>
      </main>

      <SoulmateEmailForm locale={locale} />
    </div>
  );
}
