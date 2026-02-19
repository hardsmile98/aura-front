import { RedirectWithParams } from "@/components/RedirectWithParams";
import { HomeLandingPage } from "@/components/landing-home";
import { locales, isValidLocale, defaultLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return <RedirectWithParams to={`/${defaultLocale}`} />;
  }

  return <HomeLandingPage locale={locale} />;
}
