import Image from "next/image";
import { getTranslations } from "@/lib/translations";
import { containerSectionClass } from "@/lib/container";
import type { Locale } from "@/lib/translations";

type Props = { locale: string };

const PORTRAIT_PAIRS = [
  ["/family-3.webp", "/family-4.webp"],
  ["/family-5.webp", "/family-6.webp"],
] as const;

export function LandingPaywallPortraits({ locale }: Props) {
  const lp = getTranslations((locale as Locale) || "en").landingPaywall;

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className={containerSectionClass}>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-6 md:mb-10">
          {lp.usersPortraits}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 mb-6 md:mb-10">
          {PORTRAIT_PAIRS.map((pair, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl md:rounded-2xl p-2 md:p-8 flex gap-4 shadow-none border-0 md:shadow-md md:border md:border-zinc-100"
            >
              {pair.map((src, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-lg overflow-hidden shrink-0"
                >
                  <Image
                    src={`/img${src}`}
                    alt={`Soulmate portrait ${idx * 2 + i + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-none md:shadow-md border border-zinc-100">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="h-5 w-5 shrink-0 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <h3 className="text-lg font-bold text-zinc-900">{lp.karmicLoveGuide}</h3>
          </div>
          <p className="text-base leading-[1.5] mb-6 text-zinc-600">
            {lp.karmicLoveGuideIntro}
          </p>
          <div className="relative min-h-[100px] rounded-xl overflow-hidden bg-zinc-50/50">
            <div
              className="absolute inset-0 p-4 text-sm leading-relaxed select-none blur-[2px] text-zinc-600"
              aria-hidden
            >
              <p>
                Your karmic connection is deeply rooted in shared creative
                pursuits. The stars align when you both embrace unconventional
                paths. This bond thrives on mutual inspiration and the courage to
                dream beyond boundaries.
              </p>
              <p className="mt-2">
                Compatibility indicators suggest a strong emotional resonance.
                Your partner will appreciate your artistic sensitivity and unique
                perspective on life.
              </p>
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,1) 100%)",
              }}
            />
            <div className="absolute inset-0 backdrop-blur-[3px] pointer-events-none bg-white/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 z-10">
              <svg
                className="h-9 w-9 shrink-0 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p className="text-sm text-center font-bold text-violet-600">
                {lp.karmicLoveGuidePaywall}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
