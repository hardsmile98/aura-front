import { PromoCodePage } from "@/views/soulmate";

export default async function PromoCodeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PromoCodePage locale={locale} />;
}
