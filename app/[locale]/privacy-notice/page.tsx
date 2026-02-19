import { PrivacyNoticePage } from "@/views/legal";

export default async function PrivacyNoticeRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PrivacyNoticePage locale={locale} />;
}
