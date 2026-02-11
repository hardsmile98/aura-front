import { redirect } from "next/navigation";

export default async function SoulmateResultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/soulmate/quiz`);
}
