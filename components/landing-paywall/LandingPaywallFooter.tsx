import Image from "next/image";
import Link from "next/link";
import { PaymentMethodIcons } from "@/components/PaymentMethodIcons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

type Props = { locale: string };

export function LandingPaywallFooter({ locale }: Props) {
  const lp = getTranslations((locale as Locale) || "en").landingPaywall;

  return (
    <footer className="bg-zinc-900 text-zinc-300 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/img/logo.svg"
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
                  target="_blank"
                  className="text-sm hover:text-white transition-colors"
                >
                  {lp.footerPrivacy}
                </Link>
                <Link
                  href={`/${locale}/eula`}
                  target="_blank"
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
  );
}
