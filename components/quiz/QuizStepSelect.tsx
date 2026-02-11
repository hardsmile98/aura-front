"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { getQuizIcon, type QuizIconName } from "./quizIcons";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import type { QuizStepSelectOption } from "./quizConfig";

const optionButtonBase =
  "rounded-2xl border-2 transition-all text-center font-medium cursor-pointer flex items-center justify-center text-base";
const optionButtonSelected =
  "border-violet-500 dark:border-violet-400 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300";
const optionButtonDefault =
  "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-violet-400 dark:hover:border-violet-500 text-zinc-900 dark:text-zinc-100";

type QuizStepSelectProps = {
  value: string;
  onSelect: (value: string) => void;
  options: QuizStepSelectOption[];
  titleKey: string;
  locale: string;
  layout?: "vertical" | "horizontal" | "verticalIcons" | "horizontalIcons" | "emoji";
  submitLabelKey?: string;
  submitHref?: string;
};

function renderIcon(iconName?: QuizIconName, className = "h-10 w-10") {
  if (!iconName) return null;

  const Icon = getQuizIcon(iconName);

  return Icon ? <Icon className={className} /> : null;
}

export function QuizStepSelect({
  value,
  onSelect,
  options,
  titleKey,
  locale,
  layout = "vertical",
  submitLabelKey,
  submitHref,
}: QuizStepSelectProps) {
  const t = getTranslations((locale as Locale) || "en");
  const tQuiz = t.soulmate.quiz as Record<string, string>;
  const title = tQuiz[titleKey];

  const isVerticalIcons = layout === "verticalIcons";

  const isHorizontalIcons = layout === "horizontalIcons";

  const isHorizontal = layout === "horizontal" || layout === "emoji";

  const isEmoji = layout === "emoji";

  const hasIcons = isVerticalIcons || isHorizontalIcons;

  const containerClass =
    isHorizontal || isHorizontalIcons
      ? "flex flex-row flex-wrap gap-3 justify-center"
      : "flex flex-col gap-3";

  const buttonClass = isVerticalIcons
    ? "w-full py-6 px-6 flex-col gap-3"
    : isHorizontalIcons
      ? "py-5 px-6 flex-1 min-w-0 flex-col gap-2"
      : isEmoji
        ? "py-5 px-5 flex-1 min-w-[4rem] text-2xl"
        : isHorizontal
          ? "py-4 px-6 flex-1 min-w-0"
          : "w-full py-4 px-6 text-left justify-start";

  const renderLabel = (opt: QuizStepSelectOption) => {
    const label = tQuiz[opt.labelKey];

    if (isEmoji) return label;

    if (hasIcons && opt.icon) {
      return (
        <>
          {renderIcon(opt.icon, "h-8 w-8")}
          <span>{label}</span>
        </>
      );
    }
    return label;
  };

  return (
    <div className="w-full">
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center mb-8">
        {title}
      </h2>

      <div className={containerClass}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`${optionButtonBase} ${buttonClass} ${
              value === opt.value ? optionButtonSelected : optionButtonDefault
            }`}
          >
            {renderLabel(opt)}
          </button>
        ))}
      </div>

      {submitLabelKey && submitHref && value && (
        <div className="mt-6">
          <ButtonLink href={submitHref}>{tQuiz[submitLabelKey]}</ButtonLink>
        </div>
      )}
    </div>
  );
}
