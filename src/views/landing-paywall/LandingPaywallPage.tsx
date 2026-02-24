import { Suspense } from "react";
import { LandingHeader } from "@/components/landing";
import {
  LandingPaywallFAQSection,
  LandingPaywallFooter,
  LandingPaywallPortraits,
  LandingPaywallSketchHero,
  LandingPaywallSubscription,
  LandingPaywallTestimonials,
} from "@/components/landing-paywall";

type Props = { locale: string };

export function LandingPaywallPage({ locale }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Suspense fallback={<div className="h-[120px] bg-zinc-100" />}>
        <LandingHeader />
      </Suspense>

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
