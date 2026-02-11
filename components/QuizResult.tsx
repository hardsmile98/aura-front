"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

type QuizResultProps = {
  locale: string;
};

export function QuizResult({ locale }: QuizResultProps) {
  const [progress, setProgress] = useState(0);
  const t = getTranslations((locale as Locale) || "en");

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
      } else {
        setProgress(Math.min(current, 100));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          {t.soulmate.result.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          {t.soulmate.result.subtitle}
        </p>

        <div className="w-full max-w-xs">
          <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">
            {t.soulmate.result.progress} {Math.round(progress)}%
          </p>
        </div>
      </main>
    </div>
  );
}
