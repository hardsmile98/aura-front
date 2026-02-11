import { Header } from "@/components/Header";
import { ButtonLink } from "@/components/ButtonLink";
import { CheckIcon, StarIcon } from "@/components/icons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export default async function SoulmateReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = getTranslations((locale as Locale) || "en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center leading-tight mb-4 md:mb-12">
          <span className="text-violet-600 dark:text-violet-400">
            {t.soulmate.review.headlineHighlight}
          </span>
          {t.soulmate.review.headlineRest}
        </h1>

        <article className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              {t.soulmate.review.reviewerName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap justify-between">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                  {t.soulmate.review.reviewerName}
                </div>
    
                <div className="flex gap-0.5 text-amber-400" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className="h-3 w-3 shrink-0" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {t.soulmate.review.reviewerDate}
              </div>
            </div>
          </div>
          <blockquote className="text-sm font-medium text-zinc-800 dark:text-zinc-200 italic mb-2 pl-3 border-l-2 border-violet-400 dark:border-violet-500">
            «{t.soulmate.review.reviewQuote}»
          </blockquote>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
            {t.soulmate.review.reviewTextBefore}
            <span className="font-medium text-violet-600 dark:text-violet-400">
              {t.soulmate.review.reviewTextHighlight}
            </span>
            {t.soulmate.review.reviewTextAfter}
          </p>
        </article>

        <div className="flex flex-col gap-3 w-full mb-6">
          <div className="flex items-start gap-2">
            <CheckIcon className="h-4 w-4 text-violet-500 dark:text-violet-400 shrink-0" />
            <p className="text-sm flex-1">
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                {t.soulmate.review.statTodayHighlight}
              </span>
              {t.soulmate.review.statTodayRest}
            </p>
          </div>
  
          <div className="flex items-start gap-2">
            <CheckIcon className="h-4 w-4 text-violet-500 dark:text-violet-400 shrink-0" />
            <p className="text-sm flex-1">
              {t.soulmate.review.statTrustPrefix}
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                {t.soulmate.review.statTrustHighlight}
              </span>
            </p>
          </div>
        </div>

        <ButtonLink href={`/${locale}/soulmate/quiz`}>
          {t.soulmate.review.ctaButton}
        </ButtonLink>
      </main>
    </div>
  );
}
