import { SoulmatePromoCodePage } from "@/components/SoulmatePromoCodePage";

export default async function PromoCodeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <SoulmatePromoCodePage locale={locale} />;
}
