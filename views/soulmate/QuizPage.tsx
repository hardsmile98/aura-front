import { SoulmateQuiz } from "@/components/soulmate";

type Props = { locale: string };

export function QuizPage({ locale }: Props) {
  return <SoulmateQuiz locale={locale} />;
}
