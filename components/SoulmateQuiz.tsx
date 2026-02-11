"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { QuizResult } from "@/components/QuizResult";
import {
  QuizStepSelect,
  QuizStepDate,
  QuizStepMultiSelect,
  QuizInfoSlide,
  QUIZ_STEPS,
  INFO_SLIDES,
  INITIAL_QUIZ_STATE,
  type QuizState,
  type InfoSlideConfig,
} from "@/components/quiz";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import { getZodiacSignKey } from "@/lib/zodiac";

type SoulmateQuizProps = {
  locale: string;
};

export function SoulmateQuiz({ locale }: SoulmateQuizProps) {
  const [quiz, setQuiz] = useState<QuizState>(INITIAL_QUIZ_STATE);

  const [showResult, setShowResult] = useState(false);

  const [infoSlide, setInfoSlide] = useState<{
    titleKey: string;
    descriptionKey: string;
    icon: InfoSlideConfig["icon"];
    nextStep: number;
    descriptionReplacements?: Record<string, string>;
  } | null>(null);

  const t = getTranslations((locale as Locale) || "en");

  const updateQuiz = (updates: Partial<QuizState>) => {
    setQuiz((prev) => ({ ...prev, ...updates }));
  };

  const advanceStep = (fromStep: number, recentValue?: string) => {
    const slide = INFO_SLIDES.find((s) => s.afterStep === fromStep);

    if (slide) {
      const prevStepConfig = QUIZ_STEPS[fromStep - 1];

      const field =
        prevStepConfig && "field" in prevStepConfig
          ? prevStepConfig.field
          : null;

      const value =
        recentValue ??
        (field ? (quiz[field as keyof QuizState] as string) : "");

      const descriptionKey =
        slide.descriptionByValue[value] ??
        Object.values(slide.descriptionByValue)[0];

      let descriptionReplacements: Record<string, string> | undefined;

      if (slide.afterStep === 9 && quiz.birthDate) {
        const signKey = getZodiacSignKey(quiz.birthDate);

        if (signKey) {
          const zodiacSigns = t.soulmate.zodiacSigns as Record<string, string>;
          const signName = zodiacSigns[signKey] ?? signKey;
          descriptionReplacements = { signName };
        }
      }

      setInfoSlide({
        titleKey: slide.titleKey,
        descriptionKey,
        icon: slide.icon,
        nextStep: fromStep + 1,
        descriptionReplacements,
      });
    } else {
      updateQuiz({ step: fromStep + 1 });
    }
  };

  const handleBack = () => {
    if (infoSlide) {
      setInfoSlide(null);
    } else {
      updateQuiz({ step: quiz.step - 1 });
    }
  };

  if (showResult) {
    return <QuizResult locale={locale} />;
  }

  if (infoSlide) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
        <Header
          onBack={handleBack}
          backLabel={t.soulmate.quiz.back}
          currentStep={infoSlide.nextStep - 1}
          totalSteps={QUIZ_STEPS.length}
        />
        <main className="flex-1 flex flex-col items-center px-6 py-8 md:py-16 max-w-lg mx-auto w-full">
          <QuizInfoSlide
            titleKey={infoSlide.titleKey}
            descriptionKey={infoSlide.descriptionKey}
            icon={infoSlide.icon}
            locale={locale}
            descriptionReplacements={infoSlide.descriptionReplacements}
            onContinue={() => {
              updateQuiz({ step: infoSlide.nextStep });
              setInfoSlide(null);
            }}
          />
        </main>
      </div>
    );
  }

  const currentStepConfig = QUIZ_STEPS[quiz.step - 1];
  const currentValue = currentStepConfig
    ? quiz[currentStepConfig.field as keyof QuizState]
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header
        onBack={handleBack}
        backLabel={t.soulmate.quiz.back}
        currentStep={quiz.step}
        totalSteps={QUIZ_STEPS.length}
      />

      <main className="flex-1 flex flex-col items-center px-6 py-8 md:py-16 max-w-lg mx-auto w-full">
        {currentStepConfig?.type === "select" && (
          <QuizStepSelect
            value={currentValue as string}
            onSelect={(value) => {
              updateQuiz({ [currentStepConfig.field]: value });
              if (currentStepConfig.autoAdvance) {
                advanceStep(quiz.step, value);
              }
            }}
            options={currentStepConfig.options}
            titleKey={currentStepConfig.titleKey}
            locale={locale}
            layout={currentStepConfig.layout}
            submitLabelKey={currentStepConfig.submitLabelKey}
            submitHref={
              currentStepConfig.submitLabelKey
                ? `/${locale}/soulmate/result`
                : undefined
            }
          />
        )}

        {currentStepConfig?.type === "date" && (
          <QuizStepDate
            value={currentValue as string}
            onChange={(value) => updateQuiz({ [currentStepConfig.field]: value })}
            onNext={() => advanceStep(quiz.step)}
            titleKey={currentStepConfig.titleKey}
            nextLabelKey={currentStepConfig.nextLabelKey}
            placeholderKey={
              currentStepConfig.type === "date" &&
                "placeholderKey" in currentStepConfig
                ? currentStepConfig.placeholderKey
                : undefined
            }
            locale={locale}
          />
        )}

        {currentStepConfig?.type === "multiselect" && (
          <QuizStepMultiSelect
            value={(currentValue as string[]) || []}
            onToggle={(value) => {
              const current = (quiz.sharedGoals || []) as string[];
              const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
              updateQuiz({ sharedGoals: next });
            }}
            options={currentStepConfig.options}
            titleKey={currentStepConfig.titleKey}
            locale={locale}
            submitLabelKey={currentStepConfig.submitLabelKey}
            onSubmit={() => setShowResult(true)}
          />
        )}
      </main>
    </div>
  );
}
