/** Галочка для чекбокса (без круга) */
export function CheckMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "h-4 w-4 text-violet-500 dark:text-violet-400 shrink-0"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function StarIcon({
  filled = true,
  className,
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className ?? "h-4 w-4 shrink-0"}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

/** Gift box icon for promo code page */
export function GiftBoxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gift-box" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="gift-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#FCD34D" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Box body */}
      <rect x="25" y="55" width="70" height="45" rx="4" fill="url(#gift-box)" />
      {/* Box lid */}
      <rect x="22" y="48" width="76" height="12" rx="3" fill="#A78BFA" />
      {/* Vertical ribbon */}
      <rect x="56" y="48" width="8" height="52" rx="2" fill="url(#gift-ribbon)" />
      {/* Horizontal ribbon */}
      <rect x="25" y="58" width="70" height="8" rx="2" fill="url(#gift-ribbon)" />
      {/* Bow loops */}
      <ellipse cx="45" cy="46" rx="14" ry="10" fill="url(#gift-ribbon)" />
      <ellipse cx="75" cy="46" rx="14" ry="10" fill="url(#gift-ribbon)" />
      <circle cx="60" cy="50" r="5" fill="#F59E0B" />
    </svg>
  );
}
