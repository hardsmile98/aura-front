import { EulaPage } from "@/views/legal";

export default async function EulaRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <EulaPage locale={locale} />;
}
