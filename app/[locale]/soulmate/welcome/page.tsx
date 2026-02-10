import Link from "next/link";
import { Header } from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export default async function SoulmateWelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations((locale as Locale) || "en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header locale={locale as Locale} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-12">
          {t.soulmate.welcome.headline}
        </h1>

        <div className="flex gap-8 md:gap-16 mb-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">
              {t.soulmate.welcome.stat1Value}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {t.soulmate.welcome.stat1Label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">
              {t.soulmate.welcome.stat2Value}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {t.soulmate.welcome.stat2Label}
            </div>
          </div>
        </div>

        <Link
          href={`/${locale}/soulmate/quiz`}
          className="w-full max-w-xs py-4 px-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.soulmate.welcome.ctaButton}
        </Link>

        <p className="text-zinc-600 dark:text-zinc-400 mt-6 text-sm">
          {t.soulmate.welcome.subheadline}
        </p>
      </main>

      <footer className="px-6 py-8 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-500 max-w-md mx-auto leading-relaxed">
          {t.footer.prefix}
          <Link href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
            {t.footer.termsLink}
          </Link>
          {t.footer.and}
          <Link href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
            {t.footer.privacyLink}
          </Link>
          {t.footer.suffix}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-4">
          {t.footer.disclaimer}
        </p>
      </footer>
    </div>
  );
}
