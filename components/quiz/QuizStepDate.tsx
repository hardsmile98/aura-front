"use client";

import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

/** Validates birth date: must be a real date, in the past, and within reasonable range (1900-today) */
function isValidBirthDate(value: string): boolean {
  if (!value || value.length < 10) return false;

  const date = new Date(value + "T12:00:00");

  if (isNaN(date.getTime())) return false;

  const today = new Date();

  today.setHours(23, 59, 59, 999);

  const minDate = new Date("1900-01-01");

  return date >= minDate && date <= today;
}

const inputClassName =
  "w-full min-w-0 max-w-full py-4 px-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-900/50 outline-none transition-all text-base touch-manipulation min-h-[48px] overflow-hidden text-ellipsis";
const nextButtonClassName =
  "w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center";

type QuizStepDateProps = {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  titleKey: string;
  nextLabelKey: string;
  placeholderKey?: string;
  locale: string;
};

export function QuizStepDate({
  value,
  onChange,
  onNext,
  titleKey,
  nextLabelKey,
  placeholderKey,
  locale,
}: QuizStepDateProps) {
  const t = getTranslations((locale as Locale) || "en");

  const tQuiz = t.soulmate.quiz as Record<string, string>;

  const title = tQuiz[titleKey];

  const nextLabel = tQuiz[nextLabelKey];

  const placeholder = placeholderKey ? tQuiz[placeholderKey] : undefined;

  return (
    <div className="w-full min-w-0">
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-8">
        {title}
      </h2>

      <div className="space-y-4 w-full min-w-0">
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
          placeholder={placeholder}
          lang={locale === "ru" ? "ru" : "en"}
        />

        <button
          type="button"
          onClick={onNext}
          disabled={!isValidBirthDate(value)}
          className={nextButtonClassName}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
