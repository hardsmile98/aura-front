'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type HeaderProps = {
  /** Show back button (for quiz steps > 1) */
  backHref?: string;
  /** Callback for back button (alternative to backHref) */
  onBack?: () => void;
  /** Label for back button */
  backLabel?: string;
  /** Current step number (1-based). When > 1, back button is shown. */
  currentStep?: number;
  /** Total number of steps for progress display */
  totalSteps?: number;
};

const backButtonClass =
  'absolute left-4 md:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center gap-1.5 p-3 md:p-0 text-base font-semibold text-zinc-900 hover:text-violet-600 transition-colors';

function HeaderWithParams({
  backHref,
  onBack,
  backLabel = 'Back',
  currentStep = 1,
  totalSteps,
}: HeaderProps) {
  const searchParams = useSearchParams();

  const path = backHref!.split('?')[0];
  const search = searchParams.toString();
  const resolvedBackHref = search ? `${path}?${search}` : path;

  return (
    <HeaderContent
      backHref={resolvedBackHref}
      onBack={onBack}
      backLabel={backLabel}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  );
}

function HeaderContent({
  backHref,
  onBack,
  backLabel = 'Back',
  currentStep = 1,
  totalSteps,
}: HeaderProps) {
  const showBack = (backHref || onBack) && currentStep > 1;

  const progressPercent =
    totalSteps && currentStep > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-zinc-200">
      <div className="relative flex justify-center items-center px-4 md:px-6 py-4">
        {showBack ? (
          onBack ? (
            <button type="button" onClick={onBack} className={backButtonClass}>
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden md:inline">{backLabel}</span>
            </button>
          ) : (
            <Link href={backHref!} className={backButtonClass}>
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden md:inline">{backLabel}</span>
            </Link>
          )
        ) : null}

        <Image priority src="/logo.svg" alt="Aura" width={100} height={28} />

        <div className="absolute right-4 md:right-6">
          {totalSteps != null && currentStep > 0 ? (
            <span className="text-sm text-zinc-500">
              {currentStep}/{totalSteps}
            </span>
          ) : null}
        </div>
      </div>

      {totalSteps != null && totalSteps > 0 && (
        <div className="h-1 w-full bg-zinc-200">
          <div
            className="h-full bg-violet-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
}

export function Header(props: HeaderProps) {
  if (props.backHref) {
    return (
      <Suspense
        fallback={<HeaderContent {...props} backHref={props.backHref} />}>
        <HeaderWithParams {...props} />
      </Suspense>
    );
  }
  return <HeaderContent {...props} />;
}
