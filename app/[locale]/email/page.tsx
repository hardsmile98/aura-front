import { SoulmateEmailPage } from "@/components/SoulmateEmailPage";

export default async function EmailRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <SoulmateEmailPage locale={locale} />;
}
