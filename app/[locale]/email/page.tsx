import { EmailPage } from "@/views/soulmate";

export default async function EmailRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <EmailPage locale={locale} />;
}
