import { QuizPage } from "@/views/soulmate";

export default async function SoulmateQuizRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <QuizPage locale={locale} />;
}
