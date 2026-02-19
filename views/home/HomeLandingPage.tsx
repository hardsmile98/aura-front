import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { HomeLandingHeader } from '@/components/landing-home';
import { LandingPaywallFAQ } from '@/components/landing';
import {
  StarIcon,
  CheckMarkIcon,
  SparklesIcon,
  UsersIcon,
  HeartIcon,
  ShieldCheckIcon,
  QuizClipboardIcon,
  CreditCardIcon,
  DocumentReadIcon,
  ChatUserIcon,
} from '@/components/icons';
import { containerSectionClass } from '@/lib/container';

type Props = { locale: string };

export function HomeLandingPage({ locale }: Props) {
  const t = getTranslations((locale as Locale) || 'en').landingHome;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HomeLandingHeader locale={locale} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-amber-50/80 py-8 sm:py-14 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/30 via-transparent to-amber-100/20" />
          <div className={`${containerSectionClass} relative`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6 md:gap-12 items-center">
              <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-3 md:mb-4 max-w-xl md:max-w-none">
                  {t.heroTitle}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-xl mb-6 md:mb-10 md:max-w-none">
                  {t.heroSubtitle}
                </p>
                <Link
                  href={`/${locale}/soulmate/welcome`}
                  className="w-full md:w-auto inline-flex justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow-lg shadow-violet-500/25 self-stretch md:self-auto">
                  {t.ctaButton}
                </Link>
              </div>
              <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/4] md:max-w-none md:w-full md:aspect-[4/3]">
                  <Image
                    src="/img/head-bg.webp"
                    alt=""
                    fill
                    className="object-contain object-left z-0 scale-110 origin-left"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <Image
                    src="/img/head-image.webp"
                    alt=""
                    fill
                    className="object-contain object-center md:object-right relative z-10"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-10 sm:py-14 md:py-24 bg-white">
          <div className={containerSectionClass}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-1.5 sm:mb-2">
                  {t.feature1Title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {t.feature1Desc}
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-1.5 sm:mb-2">
                  {t.feature2Title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {t.feature2Desc}
                </p>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-1.5 sm:mb-2">
                  {t.feature3Title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {t.feature3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-10 sm:py-14 md:py-24 bg-zinc-50">
          <div className={containerSectionClass}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-8 md:mb-12">
              {t.howItWorksTitle}
            </h2>

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-0 md:gap-4 mb-6 md:mb-8 max-w-4xl mx-auto">
              <div
                className="absolute left-6 top-6 bottom-6 w-0.5 bg-violet-600 md:hidden"
                aria-hidden
              />
              <div
                className="absolute left-[15%] right-[15%] top-6 h-0.5 bg-violet-600 hidden md:block"
                aria-hidden
              />
              {[
                { step: t.step1, Icon: QuizClipboardIcon },
                { step: t.step2, Icon: CreditCardIcon },
                { step: t.step3, Icon: DocumentReadIcon },
                { step: t.step4, Icon: ChatUserIcon },
              ].map(({ step, Icon }, i) => (
                <div
                  key={i}
                  className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-0 md:flex-1 min-w-0 relative z-10 py-5 md:py-0 first:pt-0 last:pb-0">
                  <div className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-violet-600 text-white flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-zinc-800 font-medium text-sm text-left md:text-center md:mt-3 leading-tight flex-1 min-w-0">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mb-10 md:mb-16 w-full md:w-auto">
              <Link
                href={`/${locale}/soulmate/welcome`}
                className="w-full md:w-auto inline-flex justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors">
                {t.howItWorksCta}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-0.5 sm:mb-1">
                  {t.statsRecommend}
                </div>
                <p className="text-zinc-600 text-xs sm:text-sm">
                  {t.statsCard1Label}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-0.5 sm:mb-1">
                  {t.statsReadings}
                </div>
                <p className="text-zinc-600 text-xs sm:text-sm">
                  {t.statsCard2Label}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-zinc-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-violet-100 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                  <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-0.5 sm:mb-1">
                  {t.statsStars}
                </div>
                <p className="text-zinc-600 text-xs sm:text-sm">
                  {t.statsCard3Label}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trial CTA */}
        <section className="py-10 sm:py-14 md:py-24 bg-white">
          <div className={containerSectionClass}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-6 md:mb-8">
              {t.trialTitle}
            </h2>
            <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="flex-1 p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 md:border-r border-zinc-200">
                <div className="flex gap-2 sm:gap-3">
                  <CheckMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 shrink-0 mt-0.5" />
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    {t.trialBenefit1}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <CheckMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 shrink-0 mt-0.5" />
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    {t.trialBenefit2}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <CheckMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 shrink-0 mt-0.5" />
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    {t.trialBenefit3}
                  </p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <CheckMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 shrink-0 mt-0.5" />
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    {t.trialBenefit4}
                  </p>
                </div>
              </div>
              <div className="md:w-1/3 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-50/50">
                <Link
                  href={`/${locale}/soulmate/welcome`}
                  className="w-full md:w-auto inline-flex justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors">
                  {t.trialCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 sm:py-14 md:py-24 bg-white">
          <div
            className={`${containerSectionClass} grid grid-cols-12 gap-y-4 gap-x-0 md:gap-y-0 md:gap-x-16 items-start`}>
            <h2 className="col-span-12 md:col-span-4 text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
              {t.faqTitle}
            </h2>
            <div className="col-span-12 md:col-span-8">
              <LandingPaywallFAQ
                items={[
                  { question: t.faq1Q, answer: t.faq1A },
                  { question: t.faq2Q, answer: t.faq2A },
                  {
                    question: t.faq3Q,
                    answer: (
                      <>
                        {t.faq3A1}
                        <Link href={`/${locale}/eula/`}>{t.faq3Link}</Link>
                        {t.faq3A2}
                      </>
                    ),
                  },
                  {
                    question: t.faq4Q,
                    answer: (
                      <>
                        {t.faq4A1}
                        <Link href={`/${locale}/eula/`}>{t.faq4Link}</Link>
                        {t.faq4A2}
                      </>
                    ),
                  },
                  {
                    question: t.faq5Q,
                    answer: (
                      <>
                        {t.faq5A1}
                        <Link href={`/${locale}/privacy-notice/`}>
                          {t.faq5Link}
                        </Link>
                        {t.faq5A2}
                      </>
                    ),
                  },
                  { question: t.faq6Q, answer: t.faq6A },
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 text-zinc-300 py-8 sm:py-10 md:py-12">
        <div className={containerSectionClass}>
          <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Image
                src="/img/logo.svg"
                alt="Aura"
                width={80}
                height={24}
                className="invert opacity-90"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="font-semibold text-white mb-2">
                  {t.footerCustomerSupport}
                </h4>
                <p className="text-sm">{t.footerSupport}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">
                  {t.footerLegal}
                </h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/${locale}/privacy-notice/`}
                    className="text-sm hover:text-white transition-colors">
                    {t.footerPrivacy}
                  </Link>
                  <Link
                    href={`/${locale}/eula/`}
                    className="text-sm hover:text-white transition-colors">
                    {t.footerTerms}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-zinc-700 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs text-zinc-500 text-center md:text-left">
              {t.footerCopyright}
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                href="/en/"
                className={`transition-colors ${locale === 'en' ? 'text-white font-medium' : 'hover:text-white'}`}>
                English
              </Link>
              <Link
                href="/ru/"
                className={`transition-colors ${locale === 'ru' ? 'text-white font-medium' : 'hover:text-white'}`}>
                Русский
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
