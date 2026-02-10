import { ru } from "./ru";
import { en } from "./en";

export type Locale = "ru" | "en";

type DeepStringify<T> = T extends object
  ? { [K in keyof T]: DeepStringify<T[K]> }
  : string;

export type Translations = DeepStringify<typeof ru>;

export const translations: Record<Locale, Translations> = {
  ru,
  en,
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}
