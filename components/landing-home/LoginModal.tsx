'use client';

import { useState, useCallback, useEffect } from 'react';
import { CloseIcon, CheckIcon } from '@/components/icons';
import { getTranslations } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { useSendLinkMutation } from '@/lib/api/authApi';

type Props = {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ locale, isOpen, onClose }: Props) {
  const t = getTranslations((locale as Locale) || 'en').landingHome;

  const [email, setEmail] = useState('');

  const [sendLink, { isLoading, isSuccess, isError, error }] = useSendLinkMutation();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
  
      sendLink({ email: email.trim(), locale });
    },
    [email, locale, sendLink]
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

        {isSuccess ? (
          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200/60">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <p className="text-emerald-800">{t.loginModalSuccess}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors"
            >
              {t.loginModalClose}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isError && (
              <p className="text-sm text-red-600">
                {(error as { status?: number })?.status === 404
                  ? t.loginModalError404
                  : t.loginModalError}
              </p>
            )}

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
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                  isError
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-zinc-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
                }`}
                autoFocus
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
            >
              {isLoading ? '...' : t.loginModalSubmit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
