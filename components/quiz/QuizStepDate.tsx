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
  "w-full min-w-0 max-w-full py-4 px-4 rounded-2xl border-2 border-zinc-200 bg-white text-zinc-900 focus:border-violet-400 focus:ring-2 focus:ring-violet-200 outline-none transition-all text-base min-w-auto";
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
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 text-center mb-8">
        {title}
      </h2>

      <div className="space-y-4 w-full min-w-0">
        <div className="overflow-hidden w-full">
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
        </div>

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
