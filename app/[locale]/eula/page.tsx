import Link from "next/link";
import { Header } from "@/components/Header";
import { getEulaContent } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export default async function EulaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const p = getEulaContent((locale as Locale) || "en");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header/>

      <main className="flex-1 px-4 md:px-6 py-8 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <Link
            href={`/${locale}/soulmate/welcome`}
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {p.backToHome}
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {p.title}
          </h1>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
          {p.sections.map((section, i) => {
            if (section.type === "paragraph") {
              return (
                <p
                  key={i}
                  className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
                >
                  {section.content}
                </p>
              );
            }
            if (section.type === "heading") {
              return (
                <h2
                  key={i}
                  className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-10 mb-3 first:mt-0"
                >
                  {section.content}
                </h2>
              );
            }
            if (section.type === "subheading") {
              return (
                <h3
                  key={i}
                  className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-2"
                >
                  {section.content}
                </h3>
              );
            }
            if (section.type === "list") {
              return (
                <ul
                  key={i}
                  className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed pl-2"
                >
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}

          <p className="text-sm text-zinc-500 dark:text-zinc-500 pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
            {p.lastUpdated}
          </p>
        </article>

        <div className="mt-12 pt-8">
          <Link
            href={`/${locale}/soulmate/welcome`}
            className="inline-flex items-center justify-center w-full md:w-auto py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {p.backToHome}
          </Link>
        </div>
      </main>
    </div>
  );
}
