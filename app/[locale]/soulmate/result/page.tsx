import { RedirectWithParams } from "@/components/shared";

export default async function SoulmateResultRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <RedirectWithParams to={`/${locale}/soulmate/quiz`} />;
}
