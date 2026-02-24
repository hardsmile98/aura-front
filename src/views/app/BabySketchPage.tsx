import { useParams } from 'react-router-dom';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { BabyIcon } from '@/components/icons';
import { LocaleLink } from '@/components/shared';

export function BabySketchPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();

  const locale = toLocale(localeParam);

  const t = getTranslations(locale).account;

  return (
    <div className="w-full">
      <LocaleLink
        locale={locale}
        to={`/${locale}/app/insights`}
        className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 mb-6"
      >
        ← {t.insights}
      </LocaleLink>

      <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
            <BabyIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">
            {t.futureBabySketchTitle}
          </h1>
          <p className="text-zinc-600 text-sm leading-relaxed max-w-md">
            {t.futureBabySketchPagePlaceholder}
          </p>
        </div>
      </div>
    </div>
  );
}
