type QuizResultQuestionModalProps = {
  question: string;
  onNo: () => void;
  onYes: () => void;
  noLabel: string;
  yesLabel: string;
};

export function QuizResultQuestionModal({
  question,
  onNo,
  onYes,
  noLabel,
  yesLabel,
}: QuizResultQuestionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center ring-1 ring-zinc-200">
        <span className="inline-block text-center mx-auto text-[2rem] font-bold mb-2">
          ✨
        </span>
        <p className="text-zinc-800 text-base font-medium mb-6">
          {question}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onNo}
            className="flex-1 py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer"
          >
            {noLabel}
          </button>
          <button
            type="button"
            onClick={onYes}
            className="flex-1 py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center cursor-pointer"
          >
            {yesLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
