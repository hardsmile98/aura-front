import { Header } from "@/components/Header";
import { ButtonLink } from "@/components/ButtonLink";
import { CheckIcon, StarIcon } from "@/components/icons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];
}

export default async function SoulmateReviewPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  const t = getTranslations((locale as Locale) || "en");
  const index = Math.max(0, Math.min(4, parseInt(id, 10) - 1));
  const review = t.soulmate.review.reviews[index]!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-lg mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 text-center leading-tight mb-4 md:mb-12">
          <span className="text-violet-600">
            {t.soulmate.review.headlineHighlight}
          </span>
          {t.soulmate.review.headlineRest}
        </h1>

        <article className="w-full rounded-lg border border-zinc-200 bg-white p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              {review.reviewerName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap justify-between">
                <div className="font-semibold text-zinc-900 text-sm">
                  {review.reviewerName}
                </div>
                <div className="flex gap-0.5 text-amber-400" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className="h-3 w-3 shrink-0" />
                  ))}
                </div>
              </div>
              <div className="text-xs text-zinc-500">
                {review.reviewerDate}
              </div>
            </div>
          </div>
          <blockquote className="text-sm font-medium text-zinc-800 italic mb-2 pl-3 border-l-2 border-violet-400">
            «{review.reviewQuote}»
          </blockquote>
          <p className="text-zinc-600 text-xs leading-relaxed">
            {review.reviewTextBefore}
            <span className="font-medium text-violet-600">
              {review.reviewTextHighlight}
            </span>
            {review.reviewTextAfter}
          </p>
        </article>

        <div className="flex flex-col gap-3 w-full mb-6">
          <div className="flex items-start gap-2">
            <CheckIcon className="h-4 w-4 text-violet-500 shrink-0" />
            <p className="text-sm flex-1">
              <span className="font-semibold text-violet-600">
                {t.soulmate.review.statTodayHighlight}
              </span>
              {t.soulmate.review.statTodayRest}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="h-4 w-4 text-violet-500 shrink-0" />
            <p className="text-sm flex-1">
              {t.soulmate.review.statTrustPrefix}
              <span className="font-semibold text-violet-600">
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
