import { containerClass, containerFormClass } from "@/lib/container";

type QuizResultProgressProps = {
  title: string;
  labels: string[];
  progress: number[];
};

export function QuizResultProgress({
  title,
  labels,
  progress,
}: QuizResultProgressProps) {
  return (
    <main className={`flex-1 flex flex-col items-center py-8 md:py-16 w-full ${containerClass}`}>
      <div className={`${containerFormClass} w-full flex flex-col items-center`}>
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">
        {title}
      </h1>

      <div className="w-full space-y-5 text-left">
        {labels.map((label, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-zinc-700">
                {label}
              </span>
              <span className="text-sm text-zinc-500" translate="no">
                {Math.round(progress[i])}%
              </span>
            </div>

            <div className="h-2.5 w-full rounded-full bg-zinc-200 overflow-hidden">
              <div
                className="h-full bg-violet-600 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress[i]}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      </div>
    </main>
  );
}
