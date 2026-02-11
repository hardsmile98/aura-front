import { SoulmateQuiz } from "@/components/SoulmateQuiz";

export default async function SoulmateQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <SoulmateQuiz locale={locale} />;
}
