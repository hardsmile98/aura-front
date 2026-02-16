"use client";

import { CheckMarkIcon } from "@/components/icons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import type { QuizStepSelectOption } from "./quizConfig";

const optionButtonBase =
  "w-full py-4 px-6 rounded-2xl border-2 transition-all font-medium cursor-pointer flex items-center gap-3 text-left text-base";
const optionButtonSelected =
  "border-violet-500 bg-violet-50 text-violet-700";
const optionButtonDefault =
  "border-zinc-200 bg-white hover:border-violet-400 text-zinc-900";

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
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 text-center mb-8">
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
                  ? "border-violet-500 bg-violet-100"
                  : "border-zinc-400 bg-transparent"
              }`}
            >
              {value.includes(opt.value) && (
                <CheckMarkIcon className="h-4 w-4 text-violet-600" />
              )}
            </span>
          </button>
        ))}
      </div>

      {value.length > 0 && (
        <button
          type="button"
          onClick={onSubmit}
          className="mt-6 w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
        >
          {tQuiz[submitLabelKey]}
        </button>
      )}
    </div>
  );
}
