import { renderInfoSlideIcon, type InfoSlideIconName } from "@/components/icons";
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';

type QuizInfoSlideProps = {
  titleKey: string;
  descriptionKey: string;
  icon: InfoSlideIconName;
  locale: string;
  onContinue: () => void;
  /** Replacements for placeholders in description (e.g. { signName: "Овен" }) */
  descriptionReplacements?: Record<string, string>;
};

export function QuizInfoSlide({
  titleKey,
  descriptionKey,
  icon,
  locale,
  onContinue,
  descriptionReplacements,
}: QuizInfoSlideProps) {
  const t = getTranslations(toLocale(locale));

  const infoSlides = t.soulmate.infoSlides as Record<string, string>;

  const title = infoSlides[titleKey];

  let description = infoSlides[descriptionKey] ?? "";

  if (descriptionReplacements) {
    for (const [key, value] of Object.entries(descriptionReplacements)) {
      description = description.replace(new RegExp(`\\{${key}\\}`, "g"), value);
    }
  }

  const continueLabel = infoSlides.continue;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        {renderInfoSlideIcon(icon)}
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 text-center mb-4">
        {title}
      </h2>

      <p className="text-zinc-600 text-center mb-8 leading-relaxed">
        {description}
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
      >
        {continueLabel}
      </button>
    </div>
  );
}
