import Link from "next/link";
import { Header } from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export default async function SoulmateQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations((locale as Locale) || "en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header locale={locale as Locale} />

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <p className="text-zinc-600 dark:text-zinc-400 text-center">
          {t.soulmate.quiz.comingSoon}
        </p>
        <Link
          href={`/${locale}/soulmate/welcome`}
          className="mt-6 text-violet-600 dark:text-violet-400 underline"
        >
          {t.soulmate.quiz.back}
        </Link>
      </main>
    </div>
  );
}
