import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { useGetHoroscopeQuery, useGetProfileQuery } from '@/lib/api/userApi';
import { HeartFilledIcon, BriefcaseIcon, HeartPulseIcon, CoinsIcon, HomeIcon, PlaneIcon, UserCircleIcon } from '@/components/icons';
import type { ComponentType } from 'react';

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

type ProfileLoaderProps = {
  loadingText: string;
  hintText: string;
};

function ProfileLoader({ loadingText, hintText }: ProfileLoaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="w-10 h-10 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-violet-600 font-medium text-center">{loadingText}</p>
      <p className="text-zinc-500 text-sm">{hintText}</p>
    </div>
  );
}

type HoroscopeLoaderProps = {
  loadingText: string;
  hintText: string;
};

function HoroscopeLoader({ loadingText, hintText }: HoroscopeLoaderProps) {
  return (
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
      <p className="text-violet-600 font-medium text-center">{loadingText}</p>
      <p className="text-zinc-500 text-sm">{hintText}</p>
    </div>
  );
}

type HoroscopeErrorProps = {
  title: string;
  hint: string;
};

function HoroscopeError({ title, hint }: HoroscopeErrorProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
        <span className="text-2xl">⚠</span>
      </div>
      <p className="text-red-600 font-medium mb-2">{title}</p>
      <p className="text-zinc-500 text-sm">{hint}</p>
    </div>
  );
}

type ProfileErrorProps = {
  title: string;
  hint: string;
};

function ProfileError({ title, hint }: ProfileErrorProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
        <UserCircleIcon className="w-8 h-8" />
      </div>
      <p className="text-red-600 font-medium mb-2">{title}</p>
      <p className="text-zinc-500 text-sm">{hint}</p>
    </div>
  );
}

type HoroscopeNoSubscriptionProps = {
  title: string;
  hint: string;
};

function HoroscopeNoSubscription({ title, hint }: HoroscopeNoSubscriptionProps) {
  return (
    <div
      role="alert"
      className="flex gap-4 p-5 md:p-6 rounded-xl md:rounded-2xl border-amber-500 bg-amber-50/80 border border-amber-100 shadow-sm"
    >
      <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
        <span className="text-2xl text-amber-600">✦</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-amber-900 mb-1">{title}</h3>
        <p className="text-sm text-amber-800/90 leading-relaxed">{hint}</p>
      </div>
    </div>
  );
}

type HoroscopeCardProps = {
  label: string;
  text: string;
  Icon: ComponentType<{ className?: string }>;
};

function HoroscopeCard({ label, text, Icon }: HoroscopeCardProps) {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-6 shadow-sm border border-zinc-100">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-zinc-900 mb-2">{label}</h2>
          <p className="text-zinc-600 text-sm leading-relaxed">{text || '—'}</p>
        </div>
      </div>
    </div>
  );
}

type HoroscopeContentProps = {
  activeTab: TabKey;
  locale: string;
  hasActiveSubscription: boolean;
  t: Record<string, string>;
};

function HoroscopeContent({
  activeTab,
  locale,
  hasActiveSubscription,
  t,
}: HoroscopeContentProps) {
  const period = TAB_TO_PERIOD[activeTab];

  const { data, isFetching, error } = useGetHoroscopeQuery(
    { period, locale },
    { skip: !hasActiveSubscription }
  );

  const horoscopeEntries = useMemo(() => {
    if (!data?.horoscope) return null;

    return DIRECTION_KEYS.map((dirKey, i) => ({
      label: t[dirKey],
      text: data.horoscope[HOROSCOPE_KEYS[i]],
    }));
  }, [data, t]);

  if (!hasActiveSubscription) {
    return (
      <HoroscopeNoSubscription
        title={t.horoscopeNoSubscription}
        hint={t.horoscopeNoSubscriptionHint}
      />
    );
  }

  if (isFetching) {
    return (
      <HoroscopeLoader
        loadingText={t.horoscopeLoading}
        hintText={
          activeTab === 'today'
            ? t.horoscopeLoadingHintDay
            : activeTab === 'week'
              ? t.horoscopeLoadingHintWeek
              : t.horoscopeLoadingHintMonth
        }
      />
    );
  }

  if (error) {
    return (
      <HoroscopeError
        title={t.horoscopeError}
        hint={t.horoscopeErrorHint}
      />
    );
  }

  return (
    <div className="space-y-6">
      {horoscopeEntries?.map((entry, i) => (
        <HoroscopeCard
          key={DIRECTION_KEYS[i]}
          label={entry.label}
          text={entry.text}
          Icon={DIRECTION_ICONS[i]}
        />
      ))}
    </div>
  );
}

export function HoroscopesPage() {
  const params = useParams();

  const locale = toLocale(params?.locale);

  const t = getTranslations(locale).account;

  const [activeTab, setActiveTab] = useState<TabKey>('today');

  const { data: profile, isLoading: profileLoading, isError: isProfileError } = useGetProfileQuery();

  const hasActiveSubscription = profile?.subscription === 'active';

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
        {profileLoading ? (
          <ProfileLoader
            loadingText={t.profileLoading}
            hintText={t.profileLoadingHint}
          />
        ) : isProfileError ? (
          <ProfileError
            title={t.profileError}
            hint={t.profileErrorHint}
          />
        ) : (
          <HoroscopeContent
            activeTab={activeTab}
            locale={locale}
            hasActiveSubscription={hasActiveSubscription}
            t={t}
          />
        )}
      </div>
    </div>
  );
}
