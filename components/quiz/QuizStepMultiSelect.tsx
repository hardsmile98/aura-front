"use client";

import { CheckMarkIcon } from "@/components/icons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import type { QuizStepSelectOption } from "./quizConfig";

const optionButtonBase =
  "w-full py-4 px-6 rounded-2xl border-2 transition-all font-medium cursor-pointer flex items-center gap-3 text-left ";
const optionButtonSelected =
  "border-violet-500 dark:border-violet-400 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300";
const optionButtonDefault =
  "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-violet-400 dark:hover:border-violet-500 text-zinc-900 dark:text-zinc-100";

type QuizStepMultiSelectProps = {
  value: string[];
  onToggle: (value: string) => void;
  options: QuizStepSelectOption[];
  titleKey: string;
  locale: string;
  submitLabelKey: string;
  onSubmit: () => void;
};

export function QuizStepMultiSelect({
  value,
  onToggle,
  options,
  titleKey,
  locale,
  submitLabelKey,
  onSubmit,
}: QuizStepMultiSelectProps) {
  const t = getTranslations((locale as Locale) || "en");
  const tQuiz = t.soulmate.quiz as Record<string, string>;
  const title = tQuiz[titleKey];

  return (
    <div className="w-full">
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-8">
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            className={`${optionButtonBase} ${
              value.includes(opt.value) ? optionButtonSelected : optionButtonDefault
            }`}
          >
            <span className="flex-1 text-left">{tQuiz[opt.labelKey]}</span>
            <span
              className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 ${
                value.includes(opt.value)
                  ? "border-violet-500 dark:border-violet-400 bg-violet-500 dark:bg-violet-400"
                  : "border-zinc-400 dark:border-zinc-500 bg-transparent"
              }`}
            >
              {value.includes(opt.value) && (
                <CheckMarkIcon className="h-4 w-4 text-white" />
              )}
            </span>
          </button>
        ))}
      </div>

      {value.length > 0 && (
        <button
          type="button"
          onClick={onSubmit}
          className="mt-6 w-full py-4 px-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
        >
          {tQuiz[submitLabelKey]}
        </button>
      )}
    </div>
  );
}
