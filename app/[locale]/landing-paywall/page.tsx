import { LandingPaywallPage } from "@/views/landing-paywall";

export default async function LandingPaywallRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LandingPaywallPage locale={locale} />;
}
