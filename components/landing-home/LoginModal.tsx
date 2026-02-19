'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CloseIcon } from '@/components/icons';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { AUTH_JWT_KEY } from '@/lib/auth';

type Props = {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ locale, isOpen, onClose }: Props) {
  const router = useRouter();
  const t = getTranslations((locale as Locale) || 'en').landingHome;
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      // Для демо: сохраняем токен и редиректим в кабинет
      localStorage.setItem(AUTH_JWT_KEY, 'demo-token-' + Date.now());
      onClose();
      router.push(`/${locale}/app`);
    },
    [email, locale, onClose, router]
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t.logIn}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-zinc-700 mb-1">
              {t.loginModalEmailLabel}
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.loginModalEmailPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-colors"
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors"
          >
            {t.loginModalSubmit}
          </button>
        </form>
      </div>
    </div>
  );
}
