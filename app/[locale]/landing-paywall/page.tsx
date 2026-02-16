import Link from "next/link";
import Image from "next/image";
import { LandingHeader } from "@/components/LandingHeader";
import { LandingPaywallFAQ } from "@/components/LandingPaywallFAQ";
import { PaymentMethodIcons } from "@/components/PaymentMethodIcons";
import { RandomReviewLink } from "@/components/RandomReviewLink";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

function StarRating({ size = "md" }: { size?: "sm" | "md" }) {
  const iconClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${iconClass} text-amber-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function LandingPaywallPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations((locale as Locale) || "en");

  const lp = t.landingPaywall;

  const faqItems = [
    { question: lp.faq1Q, answer: lp.faq1A },
    { question: lp.faq2Q, answer: lp.faq2A },
    { question: lp.faq3Q, answer: lp.faq3A },
    { question: lp.faq4Q, answer: lp.faq4A },
    {
      question: lp.faq5Q,
      answer: (
        <>
          {lp.faq5A1}
          <Link href={`#`}>
            {lp.faq5Link}
          </Link>
          {lp.faq5A2}
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader
        locale={locale}
        logInLabel={lp.logIn}
        signUpLabel={lp.signUp}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-12 md:py-20 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4">
                {lp.heroTitle}{" "}
                <span className="text-violet-600">
                  {lp.heroHighlight}
                </span>
              </h1>
              <div className="flex gap-6 mb-4 text-zinc-600">
                <span>
                  {lp.stat1Value} {lp.stat1Label}
                </span>
                <span>
                  {lp.stat2Value} {lp.stat2Label}
                </span>
              </div>
              <div className="mb-6">
                <StarRating />
              </div>
              <div className="mb-8 max-w-md">
                <RandomReviewLink locale={locale}>
                  {lp.ctaButton}
                </RandomReviewLink>
              </div>
              <div className="flex flex-wrap gap-4 items-center text-sm text-zinc-500">
                <span>As featured in:</span>
                <span className="font-semibold text-violet-600">Aura</span>
                <span>DailyWire</span>
                <span>Yahoo!</span>
                <span>Forbes</span>
                <span>Mashable</span>
                <span>FastCo</span>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border-2 border-zinc-200">
                <Image
                  src="/portrait.png"
                  alt="Soulmate sketch"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-4 right-4 w-24 h-24 rounded-lg bg-zinc-300/80 blur-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="px-4 md:px-8 py-16 bg-zinc-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-12">
              {lp.tryFor7Days}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[1, 2].map((plan) => (
                <div
                  key={plan}
                  className="bg-white rounded-2xl border-2 border-zinc-200 p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    {lp.subscription}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-4">
                    {lp.subscriptionDesc}
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-zinc-600">
                    <li className="flex gap-2">
                      <span className="text-violet-600">•</span>
                      {lp.subscriptionBullet1}
                    </li>
                    <li className="flex gap-2">
                      <span className="text-violet-600">•</span>
                      {lp.subscriptionBullet2}
                    </li>
                    <li className="flex gap-2">
                      <span className="text-violet-600">•</span>
                      {lp.subscriptionBullet3}
                    </li>
                    <li className="flex gap-2">
                      <span className="text-violet-600">•</span>
                      {lp.subscriptionBullet4}
                    </li>
                  </ul>
                  <div className="mb-4">
                    <span className="line-through text-zinc-400 text-sm">
                      {plan === 1 ? lp.plan1Price : lp.plan2Price}
                    </span>
                    <span className="ml-2 font-bold text-violet-600">
                      {plan === 1 ? lp.plan1PriceStruck : lp.plan2PriceStruck}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-4">
                    {t.footer.prefix}
                    <Link
                      href={`/${locale}/eula`}
                      className="underline hover:text-zinc-700 mx-1"
                    >
                      {t.footer.termsLink}
                    </Link>
                    {t.footer.and}
                    <Link
                      href={`/${locale}/privacy-notice`}
                      className="underline hover:text-zinc-700 mx-1"
                    >
                      {t.footer.privacyLink}
                    </Link>
                    {t.footer.suffix}
                  </p>
                  <Link
                    href={`/${locale}/soulmate/quiz`}
                    className="block w-full py-4 px-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-center transition-colors"
                  >
                    {lp.continuePayment}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Users Portraits */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-12">
              {lp.usersPortraits}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-lg border-2 border-zinc-200 overflow-hidden bg-zinc-100"
                >
                  <Image
                    src="/portrait.png"
                    alt={`Soulmate portrait ${i}`}
                    width={200}
                    height={267}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Full Guide */}
        <section className="px-4 md:px-8 py-16 bg-zinc-50">
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/${locale}/soulmate/quiz`}
              className="group flex items-center gap-4 p-6 rounded-xl border-2 border-violet-200 hover:border-violet-400 transition-colors"
            >
              <div className="flex-1">
                <h2 className="text-xl font-bold text-violet-600 mb-2">
                  {lp.getFullGuide}
                </h2>
                <p className="text-zinc-600 text-sm">
                  {lp.getFullGuideText}
                </p>
              </div>
              <svg
                className="h-6 w-6 text-violet-600 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 md:px-8 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-6 md:mb-8">
              {lp.whyLovePrefix}
              <span className="text-violet-600">
                {lp.whyLoveHighlight}
              </span>
              {lp.whyLoveSuffix}
            </h2>
            <TestimonialsCarousel
              testimonials={[
                {
                  name: lp.testimonial1Name,
                  date: lp.testimonial1Date,
                  headline: lp.testimonial1Headline,
                  text: lp.testimonial1Text,
                },
                {
                  name: lp.testimonial2Name,
                  date: lp.testimonial2Date,
                  headline: lp.testimonial2Headline,
                  text: lp.testimonial2Text,
                },
                {
                  name: lp.testimonial3Name,
                  date: lp.testimonial3Date,
                  headline: lp.testimonial3Headline,
                  text: lp.testimonial3Text,
                },
              ]}
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 md:px-8 py-8 md:py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-y-4 gap-x-0 md:gap-y-0 md:gap-x-16 items-start">
            <h2 className="col-span-12 md:col-span-4 text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
              {lp.faqTitle}
            </h2>
            <div className="col-span-12 md:col-span-8">
              <LandingPaywallFAQ items={faqItems} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Dark */}
      <footer className="bg-zinc-900 text-zinc-300 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.svg"
                alt="Aura"
                width={80}
                height={24}
                className="invert opacity-90"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-2">
                  {lp.footerCustomerSupport}
                </h4>
                <p className="text-sm">{lp.footerSupport}</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">{lp.footerLegal}</h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/${locale}/privacy-notice`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {lp.footerPrivacy}
                  </Link>
                  <Link
                    href={`/${locale}/eula`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {lp.footerTerms}
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">{lp.footerAboutUs}</h4>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-500 text-center md:text-left">
              {lp.footerCopyright}
            </p>
            <PaymentMethodIcons />
          </div>
        </div>
      </footer>
    </div>
  );
}
