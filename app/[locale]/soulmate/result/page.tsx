import { RedirectWithParams } from "@/components/RedirectWithParams";

export default async function SoulmateResultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <RedirectWithParams to={`/${locale}/soulmate/quiz`} />;
}
