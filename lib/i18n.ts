import type { Locale } from "./translations";

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "en";

export const LOCALE_STORAGE_KEY = "aura_locale";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Returns stored locale from localStorage (client-only). */
export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored && isValidLocale(stored) ? (stored as Locale) : null;
}

/** Saves locale to localStorage (client-only). */
export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
