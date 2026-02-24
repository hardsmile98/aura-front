import { useParams } from 'react-router-dom';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { BookIcon } from '@/components/icons';

export function InsightsPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();

  const locale = toLocale(localeParam);

  const t = getTranslations(locale).account;

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">
        {t.insights}
      </h1>

      <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
            <BookIcon className="w-8 h-8 text-violet-600" />
          </div>
          <p className="text-zinc-600 text-sm leading-relaxed max-w-md">
            {t.insightsPlaceholder}
          </p>
        </div>
      </div>
    </div>
  );
}
