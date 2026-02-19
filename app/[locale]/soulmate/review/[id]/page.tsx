import { ReviewIdPage } from "@/views/soulmate";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

export default async function SoulmateReviewIdRoute({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  return <ReviewIdPage locale={locale} id={id} />;
}
