import { ButtonLink } from "@/components/shared";
import { getQuizIcon, type QuizIconName } from "@/components/icons";
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import type { QuizStepSelectOption } from "./quizConfig";

const optionButtonBase =
  "rounded-2xl border-2 transition-all text-center font-medium cursor-pointer flex items-center justify-center text-base";
const optionButtonSelected =
  "border-violet-500 bg-violet-50 text-violet-700";
const optionButtonDefault =
  "border-zinc-200 bg-white hover:border-violet-400 text-zinc-900";

type QuizStepSelectProps = {
  value: string;
  onSelect: (value: string) => void;
  options: QuizStepSelectOption[];
  titleKey: string;
  locale: string;
  layout?: "vertical" | "horizontal" | "verticalIcons" | "horizontalIcons" | "emoji" | "degree";
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
  const t = getTranslations(toLocale(locale));
  const tQuiz = t.soulmate.quiz as Record<string, string>;
  const title = tQuiz[titleKey];

  const isVerticalIcons = layout === "verticalIcons";

  const isHorizontalIcons = layout === "horizontalIcons";

  const isHorizontal = layout === "horizontal" || layout === "emoji";

  const isEmoji = layout === "emoji";

  const isDegree = layout === "degree";

  const hasIcons = isVerticalIcons || isHorizontalIcons;

  const containerClass = isDegree
    ? "flex flex-row gap-0 justify-center items-stretch"
    : isHorizontal || isHorizontalIcons
      ? "flex flex-row flex-wrap gap-3 justify-center"
      : "flex flex-col gap-3";

  const getButtonClass = (_opt: QuizStepSelectOption, index: number) => {
    if (isDegree) {
      const rounded =
        index === 0
          ? "rounded-l-2xl rounded-r-none"
          : index === options.length - 1
            ? "rounded-r-2xl rounded-l-none"
            : "rounded-none";
      const borderRight = index < options.length - 1 ? "border-r-0" : "";
      return `py-5 px-3 flex-1 min-w-0 ${borderRight} ${rounded}`;
    }
    if (isVerticalIcons) return "w-full py-6 px-6 flex-col gap-3";
    if (isHorizontalIcons) return "py-5 px-6 flex-1 min-w-0 flex-col gap-2";
    if (isEmoji) return "py-5 px-5 flex-1 min-w-[4rem] text-2xl";
    if (isHorizontal) return "py-4 px-6 flex-1 min-w-0";
    return "w-full py-4 px-6 text-left justify-start";
  };

  const renderLabel = (opt: QuizStepSelectOption, index: number) => {
    const label = tQuiz[opt.labelKey];

    if (isDegree) {
      const isEdge = index === 0 || index === options.length - 1;
  
      return (
        <span className={isEdge ? "text-2xl" : "text-base"}>{label}</span>
      );
    }
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
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 text-center mb-8">
        {title}
      </h2>

      <div className={containerClass}>
        {options.map((opt, index) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`${optionButtonBase} ${getButtonClass(opt, index)} ${
              value === opt.value
                ? isDegree
                  ? "outline outline-2 outline-violet-500 outline-offset-[-2px] bg-violet-50 text-violet-700"
                  : optionButtonSelected
                : isDegree
                  ? "border-zinc-200 bg-white hover:bg-violet-50/70 text-zinc-900"
                  : optionButtonDefault
            }`}
          >
            {renderLabel(opt, index)}
          </button>
        ))}
      </div>

      {submitLabelKey && submitHref && value && (
        <div className="mt-6">
          <ButtonLink to={submitHref}>{tQuiz[submitLabelKey]}</ButtonLink>
        </div>
      )}
    </div>
  );
}
