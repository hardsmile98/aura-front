import Image from "next/image";
import { RandomReviewLink } from "@/components/RandomReviewLink";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import { StarRating } from "./StarRating";

type Props = { locale: string };

export function LandingPaywallHero({ locale }: Props) {
  const lp = getTranslations((locale as Locale) || "en").landingPaywall;
  return (
    <section className="px-4 md:px-8 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4">
            {lp.heroTitle}{" "}
            <span className="text-violet-600">{lp.heroHighlight}</span>
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
            <RandomReviewLink locale={locale}>{lp.ctaButton}</RandomReviewLink>
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
  );
}
