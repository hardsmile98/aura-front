import { WelcomePage } from "@/views/soulmate";

export default async function SoulmateWelcomeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <WelcomePage locale={locale} />;
}
