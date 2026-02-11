"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import type { QuizState } from "@/components/quiz";
import { QuizResultProgress } from "@/components/quiz/QuizResultProgress";
import { QuizResultQuestionModal } from "@/components/quiz/QuizResultQuestionModal";
import { QuizResultWarningModal } from "@/components/quiz/QuizResultWarningModal";

type QuizResultProps = {
  locale: string;
  onUpdateQuiz: (updates: Partial<QuizState>) => void;
};

type ModalState = "none" | "question1" | "question2" | "warning";

const PROGRESS_BARS = [
  { key: "progressHeartIntentions" as const, duration: 2500 },
  { key: "progressPortrait" as const, duration: 3000 },
  { key: "progressConnection" as const, duration: 2500 },
];

export function QuizResult({ locale, onUpdateQuiz }: QuizResultProps) {
  const [progress, setProgress] = useState([0, 0, 0]);
  const [modal, setModal] = useState<ModalState>("none");
  const [phase, setPhase] = useState(0);

  const t = getTranslations((locale as Locale) || "en");

  useEffect(() => {
    if (modal !== "none") return;
  
    const barIndex = phase;
  
    if (barIndex >= PROGRESS_BARS.length) return;

    const config = PROGRESS_BARS[barIndex];

    const duration = config.duration;

    const interval = 50;
  
    const step = 100 / (duration / interval);
  
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setProgress((prev) => {
          const next = [...prev];
          next[barIndex] = 100;
          return next;
        });

        clearInterval(timer);

        if (barIndex === 0) setModal("question1");
      
        else if (barIndex === 1) setModal("question2");

        else if (barIndex === 2) setModal("warning");
      } else {
        setProgress((prev) => {
          const next = [...prev];
          next[barIndex] = Math.min(current, 100);
          return next;
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase, modal]);

  const handleModalAnswer = (value: "yes" | "no") => {
    if (modal === "question1") {
      onUpdateQuiz({ spiritualPerson: value });
    } else if (modal === "question2") {
      onUpdateQuiz({ psychicArtistry: value });
    }
    setModal("none");
    setPhase((p) => p + 1);
  };

  const handleWarningClose = () => {
    setModal("none");
    setPhase((p) => p + 1);
  };

  const progressLabels = [
    t.soulmate.result.progressHeartIntentions,
    t.soulmate.result.progressPortrait,
    t.soulmate.result.progressConnection,
  ];

  const isModalOpen = modal !== "none";

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50 dark:from-violet-950/20 dark:via-zinc-950 dark:to-pink-950/20 flex flex-col">
      <Header />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${isModalOpen ? "blur-[2px] pointer-events-none" : ""}`}
      >
        <QuizResultProgress
        title={t.soulmate.result.title}
        labels={progressLabels}
        progress={progress}
      />
      </div>

      {modal === "question1" && (
        <QuizResultQuestionModal
          question={t.soulmate.result.modalQuestion1}
          onNo={() => handleModalAnswer("no")}
          onYes={() => handleModalAnswer("yes")}
          noLabel={t.soulmate.result.modalNo}
          yesLabel={t.soulmate.result.modalYes}
        />
      )}

      {modal === "question2" && (
        <QuizResultQuestionModal
          question={t.soulmate.result.modalQuestion2}
          onNo={() => handleModalAnswer("no")}
          onYes={() => handleModalAnswer("yes")}
          noLabel={t.soulmate.result.modalNo}
          yesLabel={t.soulmate.result.modalYes}
        />
      )}

      {modal === "warning" && (
        <QuizResultWarningModal
          title={t.soulmate.result.warningTitle}
          message={t.soulmate.result.warningMessage}
          privacyText={t.soulmate.result.warningPrivacy}
          buttonLabel={t.soulmate.result.warningUnderstand}
          onClose={handleWarningClose}
        />
      )}
    </div>
  );
}
