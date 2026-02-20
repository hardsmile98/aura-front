import type { Locale } from '@/lib/translations';

export const locales: Locale[] = ['ru', 'en'];

export const defaultLocale: Locale = 'en';

export const LOCALE_STORAGE_KEY = 'aura_locale';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Returns validated Locale or defaultLocale. Use instead of (locale as Locale) || defaultLocale. */
export function toLocale(locale: string | undefined | null): Locale {
  return locale && isValidLocale(locale) ? (locale as Locale) : defaultLocale;
}

/** Returns stored locale from localStorage. */
export function getStoredLocale(): Locale | null {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);

  return stored && isValidLocale(stored) ? (stored as Locale) : null;
}

/** Saves locale to localStorage. */
export function setStoredLocale(locale: Locale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
