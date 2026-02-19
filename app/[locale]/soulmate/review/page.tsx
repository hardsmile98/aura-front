import { ReviewRedirect } from "@/components/soulmate";

export default async function ReviewRedirectRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ReviewRedirect locale={locale} />;
}
