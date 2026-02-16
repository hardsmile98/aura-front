import Link from "next/link";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

type Props = { locale: string };

export function LandingPaywallSubscription({ locale }: Props) {
  const t = getTranslations((locale as Locale) || "en");
  const lp = t.landingPaywall;
  return (
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
              <h3 className="font-semibold text-zinc-900 mb-2">{lp.subscription}</h3>
              <p className="text-sm text-zinc-600 mb-4">{lp.subscriptionDesc}</p>
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
  );
}
