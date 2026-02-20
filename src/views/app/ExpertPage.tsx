import { useParams } from 'react-router-dom';
import { getTranslations } from '@/lib/translations';
import { toLocale } from '@/lib/i18n';
import { TelegramIcon, InstagramIcon, WhatsAppIcon } from '@/components/icons';

const expertLink = {
  telegram: 'https://t.me/yousoul_guide',
  instagram: 'https://instagram.com/energy_versee',
  whatsApp: 'https://wa.me/66825323200',
};

export function ExpertPage() {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const locale = toLocale(localeParam);
  const t = getTranslations(locale).account;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-zinc-100">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-40 h-40 rounded-2xl overflow-hidden bg-violet-100 shrink-0 md:mx-0">
            <img
              src="/img/expert.jpg"
              alt={t.expertName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-zinc-900 mb-1">{t.expertName}</h1>
            <p className="text-violet-600 font-medium text-sm mb-4">{t.expertTitle}</p>
            <p className="text-zinc-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
              {t.expertBio}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={expertLink.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 transition-colors text-sm font-medium"
              >
                <TelegramIcon className="w-5 h-5" />
                {t.expertTelegram}
              </a>
              <a
                href={expertLink.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors text-sm font-medium"
              >
                <InstagramIcon className="w-5 h-5" />
                {t.expertInstagram}
              </a>
              <a
                href={expertLink.whatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors text-sm font-medium"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {t.expertWhatsApp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
