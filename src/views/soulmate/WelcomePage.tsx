import { Link } from 'react-router-dom';
import { Header, RandomReviewLink } from '@/components/soulmate';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { containerClass, containerFormClass } from '@/lib/container';

type Props = { locale: string };

export function WelcomePage({ locale }: Props) {
  const t = getTranslations(toLocale(locale));

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <Header />

      <main className={`flex-1 flex flex-col items-center justify-center py-12 w-full ${containerClass}`}>
        <div className={`${containerFormClass} w-full flex flex-col items-center text-center`}>
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight mb-4 md:mb-12">
          <span className="text-violet-600">
            {t.soulmate.welcome.headlineStart}
          </span>
          {t.soulmate.welcome.headlineEnd}
        </h1>

        <div className="rounded-lg border-2 border-zinc-300 p-2 my-6 overflow-hidden min-h-[180px] md:min-h-[280px]">
          <img
            src="/img/portrait.png"
            alt="Soulmate"
            className="h-[180px] w-auto object-cover md:h-[280px]"
            loading="lazy"
          />
        </div>

        <div className="flex gap-8 md:gap-16 mb-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-violet-600">
              {t.soulmate.welcome.stat1Value}
            </div>
            <div className="text-sm text-zinc-600 mt-1">
              {t.soulmate.welcome.stat1Label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-violet-600">
              {t.soulmate.welcome.stat2Value}
            </div>
            <div className="text-sm text-zinc-600 mt-1">
              {t.soulmate.welcome.stat2Label}
            </div>
          </div>
        </div>

        <RandomReviewLink locale={locale}>
          {t.soulmate.welcome.ctaButton}
        </RandomReviewLink>

        <p className="text-zinc-600 mt-4 text-sm">
          {t.soulmate.welcome.subheadline}
        </p>
        </div>
      </main>

      <footer className={`${containerClass} py-8 text-center`}>
        <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
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
        <p className="text-xs text-zinc-400 mt-4">
          {t.footer.disclaimer}
        </p>
      </footer>
    </div>
  );
}
