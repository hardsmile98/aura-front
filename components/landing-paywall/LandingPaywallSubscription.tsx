import Image from "next/image";
import Link from "next/link";
import { CheckIcon, GiftBoxIcon, StarIcon } from "@/components/icons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

type Props = { locale: string };

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function StarOutlineIcon({ className }: { className?: string }) {
  return <StarIcon filled={false} className={className} />;
}

function ConnectionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function LandingPaywallSubscription({ locale }: Props) {
  const t = getTranslations((locale as Locale) || "en");
  const lp = t.landingPaywall;

  const trustFeatures = [
    {
      icon: BrainIcon,
      title: lp.subscriptionTrust1Title,
      desc: lp.subscriptionTrust1Desc,
    },
    {
      icon: StarOutlineIcon,
      title: lp.subscriptionTrust2Title,
      desc: lp.subscriptionTrust2Desc,
    },
    {
      icon: ConnectionIcon,
      title: lp.subscriptionTrust3Title,
      desc: lp.subscriptionTrust3Desc,
    },
  ];

  const benefits = [
    lp.subscriptionBenefit1,
    lp.subscriptionBenefit2,
    lp.subscriptionBenefit3,
    lp.subscriptionBenefit4,
  ];

  return (
    <section className="px-0 md:px-8 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-2 md:mb-10">
          {lp.tryFor7Days}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left card - Trust */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-none border-0 md:shadow-md md:border md:border-zinc-100">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-8 p-4 rounded-xl bg-zinc-100">
              <span className="text-sm font-medium text-zinc-900">
                {lp.subscriptionPeopleJoined}
              </span>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-zinc-200 shrink-0">
                  <Image
                    src="/man-1.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-700 shrink-0">
                  S
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-zinc-200 shrink-0">
                  <Image
                    src="/woman-1.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center text-[10px] font-semibold text-zinc-700 shrink-0">
                  +993
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wide mb-6">
              {lp.subscriptionWhyTrust}
            </h3>
            <ul className="space-y-5 mb-8">
              {trustFeatures.map((f, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 text-sm mb-1">
                      {f.title}
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="text-sm font-bold text-zinc-800 uppercase tracking-wide mb-3">
                {lp.subscriptionFeaturedIn}
              </h4>

              <div className="flex flex-wrap items-center gap-3">
                <Image
                  src="/Globe.svg"
                  alt="The Globe and Mail"
                  width={80}
                  height={24}
                  className="h-5 w-auto object-contain opacity-70"
                />
                <Image
                  src="/Benzinga.svg"
                  alt="Benzinga"
                  width={80}
                  height={24}
                  className="h-5 w-auto object-contain opacity-70"
                />
                <Image
                  src="/Barchart.svg"
                  alt="Barchart"
                  width={80}
                  height={24}
                  className="h-5 w-auto object-contain opacity-70"
                />
                <Image
                  src="/Yahoo.svg"
                  alt="Yahoo!"
                  width={80}
                  height={24}
                  className="h-5 w-auto object-contain opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Right card - Pricing & Payment */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-none border-0 md:shadow-md md:border md:border-zinc-100">
            <ul className="space-y-3 mb-6">
              {benefits.map((text, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-700">
                  <CheckIcon className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50/80 border border-violet-100">
                <GiftBoxIcon className="w-6 h-6 text-violet-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-900 text-sm">
                    {lp.subscriptionPromoReport}
                  </p>
                  <p className="text-xs text-violet-600 font-medium">
                    {lp.subscriptionPromoClaimed}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50/80 border border-violet-100">
                <GiftBoxIcon className="w-6 h-6 text-violet-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {lp.subscriptionPromoCodePrefix}
                    <span>
                      {lp.subscriptionPromoCodeValue}
                    </span>
                    {lp.subscriptionPromoCodeSuffix}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {lp.subscriptionPromoYouSave}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-zinc-200 mb-6">
              <span className="text-zinc-700 font-bold">
                {lp.subscriptionTotalDue}
              </span>
              <div className="text-right">
                <span className="line-through text-zinc-400 text-sm mr-2">
                  {lp.plan1Price}
                </span>
                <span className="font-bold text-zinc-900">{lp.plan1PriceStruck}</span>
                <p className="text-sm text-emerald-600 font-medium mt-0.5">
                  {lp.subscriptionPromoYouSave}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                href={`#`}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
                {lp.subscriptionCreditCard}
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4 text-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}
