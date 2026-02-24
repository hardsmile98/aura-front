import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { useGetHoroscopeQuery } from '@/lib/api/userApi';
import { HeartFilledIcon, BriefcaseIcon, HeartPulseIcon, CoinsIcon, HomeIcon, PlaneIcon } from '@/components/icons';

type TabKey = 'today' | 'week' | 'month';

const TAB_TO_PERIOD: Record<TabKey, 'day' | 'week' | 'month'> = {
  today: 'day',
  week: 'week',
  month: 'month',
};

const DIRECTION_KEYS = [
  'directionLove',
  'directionCareer',
  'directionHealth',
  'directionFinance',
  'directionFamily',
  'directionTravel',
] as const;

const HOROSCOPE_KEYS = ['love', 'career', 'health', 'finance', 'family', 'travel'] as const;

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

  const locale = toLocale(params?.locale);

  const t = getTranslations(locale).account;

  const [activeTab, setActiveTab] = useState<TabKey>('today');
  const period = TAB_TO_PERIOD[activeTab];

  const { data, isSuccess, isFetching, error } = useGetHoroscopeQuery({
    period,
    locale,
  });

  const horoscopeEntries = useMemo(() => {
    if (!data?.horoscope) return null;

    return DIRECTION_KEYS.map((dirKey, i) => ({
      label: t[dirKey],
      text: data.horoscope[HOROSCOPE_KEYS[i]],
    }));
  }, [data, t]);

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
        {isFetching && (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="text-2xl animate-horoscope-star"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    ✦
                  </span>
                ))}
              </div>
              <p className="text-violet-600 font-medium text-center">
                {t.horoscopeLoading}
              </p>
              <p className="text-zinc-500 text-sm">
                {activeTab === 'today' && t.horoscopeLoadingHintDay}
                {activeTab === 'week' && t.horoscopeLoadingHintWeek}
                {activeTab === 'month' && t.horoscopeLoadingHintMonth}
              </p>
            </div>
          </div>
        )}

        {!isFetching && error && (
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
              <span className="text-2xl">⚠</span>
            </div>
            <p className="text-red-600 font-medium mb-2">
              {t.horoscopeError}
            </p>
            <p className="text-zinc-500 text-sm">
              {t.horoscopeErrorHint}
            </p>
          </div>
        )}

        {!isFetching && isSuccess && horoscopeEntries?.map((entry, i) => {
          const Icon = DIRECTION_ICONS[i];
          return (
            <div
              key={DIRECTION_KEYS[i]}
              className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-zinc-100"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-zinc-900 mb-2">{entry.label}</h2>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {entry.text || '—'}
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
