'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { ScrollToPaymentButton } from '@/components/landing-paywall/ScrollToPaymentButton';

const TOP_BAR_HEIGHT = 40;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function LandingHeader() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as Locale) || 'en';
  const userEmail = searchParams?.get('email');
  const t = getTranslations(locale).common.header;

  const displayEmail = userEmail
    ? userEmail.length > 20
      ? `${userEmail.slice(0, 12)}...`
      : userEmail
    : 'user@example.com';

  // Анимированные сообщения в верхней плашке
  const messages = [
    ...(t.activityMessages as readonly {
      name: string;
      actionBefore: string;
      actionHighlight: string;
    }[]),
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 2000; // 3–5 секунд

      timeoutId = setTimeout(() => {
        setMessageIndex((i) => (i + 1) % messages.length);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [messages.length]);

  // Таймер 15 минут
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const containerWrapper = 'px-4 md:px-8';

  const containerInner = 'max-w-7xl mx-auto';

  return (
    <>
      {/* Блок 1 — верхняя плашка с действиями, sticky, как блок 3 */}
      <div className="sticky top-0 z-50 w-full shrink-0 bg-[#f8f8f8] border-b border-zinc-200">
        <div className={containerWrapper}>
          <div className={`${containerInner} py-3 flex justify-center`}>
            <div
              className="text-xs text-zinc-600 text-center animate-activity-fade"
              key={messageIndex}>
              <span className="font-bold text-zinc-800">
                {messages[messageIndex].name}
              </span>{' '}
              <span className="text-zinc-600">
                {messages[messageIndex].actionBefore}
              </span>{' '}
              <span className="text-violet-600">
                {messages[messageIndex].actionHighlight}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Блок 2 — основной хедер, НЕ sticky, скроллится */}
      <div className="w-full bg-zinc-100 border-b border-zinc-200">
        <div className={containerWrapper}>
          <div
            className={`${containerInner} flex justify-between items-center py-3`}>
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                priority
                src="/logo.svg"
                alt={t.logo}
                width={100}
                height={28}
                className="text-violet-600"
              />
            </Link>

            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-200/80">
              <div className="w-5 h-5 rounded-full bg-zinc-300 flex items-center justify-center text-[10px] font-semibold text-zinc-600 shrink-0">
                {displayEmail.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-zinc-600 truncate max-w-[80px] md:max-w-[100px]">
                {displayEmail}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Блок 3 — баннер с оффером и таймером, sticky ниже блока 1 */}
      <div
        className="sticky z-40 w-full shrink-0 bg-white border-b border-zinc-200"
        style={{ top: TOP_BAR_HEIGHT }}>
        <div className={containerWrapper}>
          <div
            className={`${containerInner} flex justify-between items-center py-3`}>
            <div className="text-sm text-zinc-800 font-semibold ">
              <span>{t.offerPrefix}</span>
              <span className="text-violet-600">{t.offerHighlight}</span>
              <span>{t.offerSuffix}</span>
              <div className="font-bold text-base mt-0.5 tabular-nums">
                {formatTime(secondsLeft)}
              </div>
            </div>
            <ScrollToPaymentButton className="shrink-0 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              {t.continue}
            </ScrollToPaymentButton>
          </div>
        </div>
      </div>
    </>
  );
}
