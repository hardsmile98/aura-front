"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

function ChevronIcon({
  className,
  open,
}: {
  className?: string;
  open: boolean;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  );
}

export function LandingPaywallFAQ({ items }: { items: FAQItem[] }) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleIndex = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          className="border-b border-zinc-200 dark:border-zinc-700 last:border-b-0"
        >
          <button
            type="button"
            onClick={() => toggleIndex(i)}
            className="w-full flex justify-between items-center gap-4 text-left py-5"
          >
            <span className="font-semibold text-base md:text-lg text-zinc-900 dark:text-zinc-100">
              {item.question}
            </span>
            <ChevronIcon
              open={openIndices.has(i)}
              className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400"
            />
          </button>

          {openIndices.has(i) && (
            <div className="pb-5 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-700 dark:[&_a]:hover:text-blue-300">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
