'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

type TabKey = 'today' | 'week' | 'month';

const DIRECTION_KEYS = [
  'directionLove',
  'directionCareer',
  'directionHealth',
  'directionFinance',
  'directionFamily',
  'directionTravel',
] as const;

// Placeholder horoscope content (would come from API in production)
const HOROSCOPE_BY_PERIOD: Record<TabKey, string> = {
  today:
    'The stars align favorably for you today. Trust your intuition and stay open to new opportunities. A positive energy surrounds your endeavors.',
  week:
    'This week brings promising developments. Focus on your goals and maintain balance. The cosmic energy supports growth and meaningful connections.',
  month:
    'A transformative month awaits. Major shifts in perspective may occur. Embrace change and trust the journey. Long-term plans gain momentum.',
};

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CoinsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

const DIRECTION_ICONS = [
  HeartIcon,
  BriefcaseIcon,
  HeartPulseIcon,
  CoinsIcon,
  HomeIcon,
  PlaneIcon,
];

export default function HoroscopesPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';
  const t = getTranslations(locale).account;

  const [activeTab, setActiveTab] = useState<TabKey>('today');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'today', label: t.tabToday },
    { key: 'week', label: t.tabWeek },
    { key: 'month', label: t.tabMonth },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">
        {t.horoscopes}
      </h1>

      {/* Tabs - more visible active state */}
      <div className="flex gap-2 p-2 rounded-xl bg-zinc-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-zinc-600 hover:bg-zinc-300/50 hover:text-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Horoscope cards by direction */}
      <div className="space-y-6">
        {DIRECTION_KEYS.map((key, i) => {
          const Icon = DIRECTION_ICONS[i];
          const label = t[key];
          return (
            <div
              key={key}
              className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-zinc-100"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-zinc-900 mb-2">{label}</h2>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {HOROSCOPE_BY_PERIOD[activeTab]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
