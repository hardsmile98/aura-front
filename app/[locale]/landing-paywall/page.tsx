import { LandingHeader } from "@/components/LandingHeader";
import {
  LandingPaywallFAQSection,
  LandingPaywallFooter,
  LandingPaywallPortraits,
  LandingPaywallSketchHero,
  LandingPaywallSubscription,
  LandingPaywallTestimonials,
} from "@/components/landing-paywall";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export default async function LandingPaywallPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lp = getTranslations((locale as Locale) || "en").landingPaywall;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHeader
        locale={locale}
        logInLabel={lp.logIn}
        signUpLabel={lp.signUp}
      />

      <main className="flex-1">
        <LandingPaywallSketchHero locale={locale} />
        <LandingPaywallSubscription locale={locale} />
        <LandingPaywallPortraits locale={locale} />
        <LandingPaywallTestimonials locale={locale} />
        <LandingPaywallFAQSection locale={locale} />
      </main>

      <LandingPaywallFooter locale={locale} />
    </div>
  );
}
