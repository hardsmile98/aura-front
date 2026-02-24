import { useParams } from 'react-router-dom';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { HeartFilledIcon, BabyIcon } from '@/components/icons';
import { LocaleLink } from '@/components/shared';
import { useGetProfileQuery } from '@/lib/api/userApi';

function InsightCard({
  icon: Icon,
  iconBgClass,
  iconClass,
  title,
  description,
  cta,
  to,
  locale,
  disabled,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconBgClass: string;
  iconClass: string;
  title: string;
  description: string;
  cta: string;
  to: string;
  locale: Locale;
  disabled?: boolean;
}) {
  const buttonClass =
    'inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm rounded-lg font-medium transition-colors';

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        <div
          className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${iconBgClass}`}
        >
          <Icon className={`w-8 h-8 ${iconClass}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-zinc-900 mb-2">{title}</h2>
          <p className="text-zinc-600 text-sm leading-relaxed mb-4">
            {description}
          </p>
          {disabled ? (
            <span
              className={`${buttonClass} bg-zinc-200 text-zinc-500 cursor-not-allowed`}
            >
              {cta}
            </span>
          ) : (
            <LocaleLink
              locale={locale}
              to={to}
              className={`${buttonClass} bg-violet-600 text-white hover:bg-violet-700`}
            >
              {cta}
            </LocaleLink>
          )}
        </div>
      </div>
    </div>
  );
}

export function InsightsPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();

  const locale = toLocale(localeParam);

  const t = getTranslations(locale).account;

  const { data: profile } = useGetProfileQuery();

  const hasActiveSubscription = profile?.subscription === 'active';

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">
        {t.insights}
      </h1>

      <div className="flex flex-col gap-6">
        <InsightCard
          icon={HeartFilledIcon}
          iconBgClass="bg-pink-100"
          iconClass="text-pink-600"
          title={t.soulmateSketchTitle}
          description={t.soulmateSketchDesc}
          cta={t.soulmateSketchCta}
          to={`/${locale}/app/soulmate-sketch`}
          locale={locale}
          disabled={!hasActiveSubscription}
        />

        <InsightCard
          icon={BabyIcon}
          iconBgClass="bg-amber-100"
          iconClass="text-amber-600"
          title={t.futureBabySketchTitle}
          description={t.futureBabySketchDesc}
          cta={t.futureBabySketchCta}
          to={`/${locale}/app/baby-sketch`}
          locale={locale}
          disabled={!hasActiveSubscription}
        />
      </div>
    </div>
  );
}
