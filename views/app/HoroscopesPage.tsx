'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { HeartFilledIcon, BriefcaseIcon, HeartPulseIcon, CoinsIcon, HomeIcon, PlaneIcon } from '@/components/icons';

type TabKey = 'today' | 'week' | 'month';

const DIRECTION_KEYS = [
  'directionLove',
  'directionCareer',
  'directionHealth',
  'directionFinance',
  'directionFamily',
  'directionTravel',
] as const;

const HOROSCOPE_BY_PERIOD: Record<TabKey, string> = {
  today:
    'The stars align favorably for you today. Trust your intuition and stay open to new opportunities. A positive energy surrounds your endeavors.',
  week:
    'This week brings promising developments. Focus on your goals and maintain balance. The cosmic energy supports growth and meaningful connections.',
  month:
    'A transformative month awaits. Major shifts in perspective may occur. Embrace change and trust the journey. Long-term plans gain momentum.',
};

const DIRECTION_ICONS = [
  HeartFilledIcon,
  BriefcaseIcon,
  HeartPulseIcon,
  CoinsIcon,
  HomeIcon,
  PlaneIcon,
];

export function HoroscopesPage() {
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
