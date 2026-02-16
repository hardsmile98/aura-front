"use client";

type QuizResultWarningModalProps = {
  title: string;
  message: string;
  privacyText: string;
  buttonLabel: string;
  onClose: () => void;
};

export function QuizResultWarningModal({
  title,
  message,
  privacyText,
  buttonLabel,
  onClose,
}: QuizResultWarningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center ring-1 ring-zinc-200">
        <h2 className="text-lg font-bold text-amber-500 uppercase tracking-wide mb-4">
          {title}
        </h2>

        <p className="text-zinc-700 mb-4 leading-relaxed">
          {message}
        </p>
      
        <div className="inline-block text-zinc-600 mb-6 text-sm">
          <svg
            className="inline size-5 text-emerald-500 align-middle mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="inline align-middle">{privacyText}</span>
        </div>
  
        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
