import { RedirectWithParams } from "@/components/RedirectWithParams";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <RedirectWithParams to={`/${locale}/soulmate/welcome`} />;
}
