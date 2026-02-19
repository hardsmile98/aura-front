import type { Metadata } from "next";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, defaultLocale, locales } from "@/lib/i18n";
import { RedirectWithParams } from "@/components/shared";
import { AuthRedirectToApp } from "@/components/shared";
import type { Locale } from "@/lib/translations";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return {};
  }

  const t = getTranslations(locale as Locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return <RedirectWithParams to={`/${defaultLocale}`} />;
  }

  return (
    <>
      <AuthRedirectToApp />
      {children}
    </>
  );
}
