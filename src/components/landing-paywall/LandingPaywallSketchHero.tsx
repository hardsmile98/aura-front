import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { ScrollToPaymentButton } from "./ScrollToPaymentButton";
import { StarRating } from "./StarRating";
import { MEDIA_LOGOS } from "./MediaLogos";
import { containerSectionClass } from "@/lib/ui/container";
import { UsersIcon, ShieldCheckIcon } from "@/components/icons";

type Props = { locale: string };

function SketchImagesBlock({ className }: { className?: string }) {
  return (
    <div className={`relative gap-4 flex flex-row justify-center items-center w-full ${className ?? ""}`}>
      <div className="relative w-[calc(50%-8px)] min-w-[160px] aspect-[3/4] overflow-hidden">
        <img
          src="/img/woman.webp"
          alt="Woman viewing soulmate sketch"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative w-[calc(50%-8px)] min-w-[160px] aspect-[3/4] overflow-hidden">
        <img
          src="/img/man-sketch.webp"
          alt="Soulmate sketch"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 113 24"
        className="z-10 absolute bottom-[15%] right-1/2 translate-x-1/2 w-[40%]"
        aria-hidden
      >
        <path
          fill="#6321A5"
          d="M96.376 8.23c1.024-.258.88-1.66-.168-1.788-6.149-.755-12.01-1.464-17.871-2.244-1.012-.204-.428-1.922.592-2.072 2.165-.317 4.056-.611 5.948-.687 6.963-.212 13.82-.212 20.782-.212.844 0 1.688-.107 2.532.106 2.743.53 3.692 2.334 2.215 4.775a18.6 18.6 0 0 1-2.531 3.183c-3.587 3.608-7.279 7.11-10.972 10.611-.293.295-.653.521-1.081.753-.798.432-1.792-.164-1.572-1.044.792-3.174 3.732-4.827 5.32-7.342.483-.764-.257-1.616-1.14-1.424q-.3.065-.577.144c-28.483 7.852-56.861 7.003-85.133-.637-2.954-.743-5.802-1.91-8.65-2.971-1.478-.53-2.743-1.698-1.9-3.502.739-1.804 2.216-1.804 3.904-1.06C24.957 11.306 45 12.261 65.255 11.943c10.55-.106 20.888-1.274 31.12-3.714"
        />
      </svg>
    </div>
  );
}

export function LandingPaywallSketchHero({ locale }: Props) {
  const lp = getTranslations(toLocale(locale)).landingPaywall;

  return (
    <section className="bg-zinc-50 py-12 md:py-16 overflow-x-hidden">
      <div className={containerSectionClass}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center mb-12">
          {/* Left: CTA & Social Proof */}
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold text-zinc-800 mb-1 text-center md:text-left">
              {lp.heroTitle}
            </h1>
            <h1 className="text-2xl md:text-4xl font-bold text-violet-600 leading-tight mb-6 text-center md:text-left">
              {lp.heroHighlight}
            </h1>

            {/* Mobile: блок с картинками над CTA */}
            <SketchImagesBlock className="md:hidden mb-8" />

            {/* Мобиле: кнопка первая, преимущества вторые. Десктоп: преимущества первые, кнопка вторые */}
            <div className="flex flex-col gap-8">
              <div className="order-2 md:order-1 space-y-3 px-4 md:px-0">
                <div className="flex items-center gap-3 text-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                    <UsersIcon className="w-5 h-5 text-violet-600" />
                  </div>
                  <span className="text-sm md:text-base">
                    <span className="font-bold">900+</span> {lp.sketchHeroStat1}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheckIcon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <span className="text-sm md:text-base block">
                      {lp.sketchHeroStat2}{" "}
                      <span className="font-bold">{lp.sketchHeroStat2Bold}</span>{" "}
                      {lp.sketchHeroStat2Suffix}
                    </span>
                    <div>
                      <StarRating />
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 max-w-md overflow-visible mx-auto md:mx-0 w-full">
                <ScrollToPaymentButton
                  className="inline-flex w-full py-3.5 px-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors items-center justify-center"
                  style={{ animation: "button-pulse 2s ease-in-out infinite" }}
                >
                  {lp.sketchHeroCta}
                </ScrollToPaymentButton>
              </div>
            </div>
          </div>

          {/* Desktop: Woman + Sketch with curved arrow (скрыт на мобиле) */}
          <SketchImagesBlock className="hidden md:flex" />
        </div>
      </div>

      {/* Media logos strip - infinite marquee, на всю ширину экрана */}
      <div
        className="relative w-full overflow-hidden group pt-2 md:pt-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)",
        }}
      >
          <style>{`
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
          <div
            className="flex shrink-0 w-max group-hover:[animation-play-state:paused]"
            style={{
              animation: "marquee-scroll 60s linear infinite",
            }}
          >
            {/* Две одинаковые копии без gap между ними — бесшовный цикл при translateX(-50%) */}
            <div className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12">
              {MEDIA_LOGOS.map((logo, i) => (
                <div
                  key={`a-${i}`}
                  className="flex shrink-0 items-center justify-center min-w-[140px]"
                >
                  {logo.svg}
                </div>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12">
              {MEDIA_LOGOS.map((logo, i) => (
                <div
                  key={`b-${i}`}
                  className="flex shrink-0 items-center justify-center min-w-[140px]"
                >
                  {logo.svg}
                </div>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12">
              {MEDIA_LOGOS.map((logo, i) => (
                <div
                  key={`b-${i}`}
                  className="flex shrink-0 items-center justify-center min-w-[140px]"
                >
                  {logo.svg}
                </div>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-8 md:gap-12 pr-8 md:pr-12">
              {MEDIA_LOGOS.map((logo, i) => (
                <div
                  key={`b-${i}`}
                  className="flex shrink-0 items-center justify-center min-w-[140px]"
                >
                  {logo.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
