import { ReviewRedirect } from "@/components/ReviewRedirect";

export default async function ReviewRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ReviewRedirect locale={locale} />;
}
