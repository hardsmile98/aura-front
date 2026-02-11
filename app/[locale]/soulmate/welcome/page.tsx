import Link from "next/link";
import { Header } from "@/components/Header";
import { ButtonLink } from "@/components/ButtonLink";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import Image from "next/image";

export default async function SoulmateWelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = getTranslations((locale as Locale) || "en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-4 md:mb-12">
          <span className="text-violet-600 dark:text-violet-400">
            {t.soulmate.welcome.headlineStart}
          </span>
          {t.soulmate.welcome.headlineEnd}
        </h1>

        <div className="rounded-lg border-2 border-zinc-300 dark:border-zinc-600 p-2 my-6 overflow-hidden min-h-[180px] md:min-h-[280px]">
          <Image
            src="/portrait.png"
            alt="Soulmate"
            width={220}
            height={280}
            className="h-[180px] w-auto object-cover md:h-[280px]"
            loading="lazy"
          />
        </div>

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

        <ButtonLink href={`/${locale}/soulmate/review`}>
          {t.soulmate.welcome.ctaButton}
        </ButtonLink>

        <p className="text-zinc-600 dark:text-zinc-400 mt-4 text-sm">
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
