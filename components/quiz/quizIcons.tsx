export function MaleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="14" r="5" />
      <line x1="19" y1="5" x2="14" y2="10" />
      <line x1="19" y1="5" x2="19" y2="9" />
      <line x1="19" y1="5" x2="15" y2="5" />
    </svg>
  );
}

export function FemaleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <line x1="12" y1="13" x2="12" y2="21" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#f43f5e"
      stroke="#e11d48"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7c3aed"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="5" cy="17" r="3" fill="#22c55e" stroke="#22c55e" strokeWidth={1.5} />
      <path d="M3.5 17l1 1 2-2" stroke="white" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 12l.75 2.25L22 15l-2.25.75L19 18l-.75-2.25L16 15l2.25-.75L19 12z" />
      <path d="M5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5L5 16z" />
    </svg>
  );
}

/** Реестр иконок для информационных слайдов */
export const INFO_SLIDE_ICONS = {
  target: TargetIcon,
  sparkles: SparklesIcon,
  heart: HeartIcon,
} as const;

export type InfoSlideIconName = keyof typeof INFO_SLIDE_ICONS;

export function getInfoSlideIcon(name: InfoSlideIconName) {
  return INFO_SLIDE_ICONS[name];
}

/** Возвращает React-элемент иконки на белой подложке */
export function renderInfoSlideIcon(name: InfoSlideIconName, className?: string) {
  const Icon = INFO_SLIDE_ICONS[name];
  return Icon ? (
    <span
      className={`flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-zinc-200/60 md:size-28 dark:bg-white/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:ring-white/10 ${className ?? ""}`.trim()}
    >
      <Icon className="size-16 shrink-0 md:size-20" />
    </span>
  ) : null;
}

/** Реестр иконок для использования в конфиге квиза */
export const QUIZ_ICONS = {
  male: MaleIcon,
  female: FemaleIcon,
} as const;

export type QuizIconName = keyof typeof QUIZ_ICONS;

export function getQuizIcon(name: QuizIconName) {
  return QUIZ_ICONS[name];
}
