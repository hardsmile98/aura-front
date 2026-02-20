import { Link } from "react-router-dom";
import { LandingPaywallFAQ } from "@/components/landing";
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { containerSectionClass } from "@/lib/ui/container";

type Props = { locale: string };

export function LandingPaywallFAQSection({ locale }: Props) {
  const t = getTranslations(toLocale(locale));

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
          <Link to="#">{lp.faq5Link}</Link>
          {lp.faq5A2}
        </>
      ),
    },
  ];

  return (
    <section className="py-8 md:py-16">
      <div className={`${containerSectionClass} grid grid-cols-12 gap-y-4 gap-x-0 md:gap-y-0 md:gap-x-16 items-start`}>
        <h2 className="col-span-12 md:col-span-4 text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
          {lp.faqTitle}
        </h2>
        <div className="col-span-12 md:col-span-8">
          <LandingPaywallFAQ items={faqItems} />
        </div>
      </div>
    </section>
  );
}
