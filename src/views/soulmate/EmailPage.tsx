import { Header } from '@/components/soulmate';
import { SoulmateEmailForm } from '@/components/soulmate';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { containerClass, containerFormClass } from '@/lib/ui/container';

type Props = { locale: string };

export function EmailPage({ locale }: Props) {
  const t = getTranslations(toLocale(locale));

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <Header />

      <main className={`flex-1 flex flex-col items-center py-8 md:py-16 w-full ${containerClass}`}>
        <div className={`${containerFormClass} w-full flex flex-col items-center`}>
        <h1 className="text-xl md:text-2xl font-bold text-zinc-900 mb-8 text-center">
          {t.soulmate.result.emailTitle}
        </h1>

        <div className="relative w-full max-w-[280px] aspect-[3/4] mx-auto">
          <img
            src="/img/portrait.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-lg blur-sm grayscale"
          />
        </div>
        </div>
      </main>

      <SoulmateEmailForm locale={locale} />
    </div>
  );
}
