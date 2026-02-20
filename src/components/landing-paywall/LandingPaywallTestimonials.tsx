import { TestimonialsCarousel } from "@/components/landing";
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { containerSectionClass } from "@/lib/container";

type Props = { locale: string };

export function LandingPaywallTestimonials({ locale }: Props) {
  const lp = getTranslations(toLocale(locale)).landingPaywall;

  const testimonials = [
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
  ];

  return (
    <section className="py-16 bg-white">
      <div className={containerSectionClass}>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center mb-6 md:mb-8">
          {lp.whyLovePrefix}
          <span className="text-violet-600">{lp.whyLoveHighlight}</span>
          {lp.whyLoveSuffix}
        </h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
