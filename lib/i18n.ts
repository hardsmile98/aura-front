import type { Locale } from "./translations";

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
