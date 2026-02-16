import { ru } from "./ru";
import { en } from "./en";
import { privacyEn } from "./privacy-en";
import { privacyRu } from "./privacy-ru";
import { eulaEn } from "./eula-en";
import { eulaRu } from "./eula-ru";

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

export type PrivacyContent =
  | typeof privacyEn
  | typeof privacyRu;

export function getPrivacyContent(locale: Locale): PrivacyContent {
  return locale === "ru" ? privacyRu : privacyEn;
}

export type EulaContent = typeof eulaEn | typeof eulaRu;

export function getEulaContent(locale: Locale): EulaContent {
  return locale === "ru" ? eulaRu : eulaEn;
}
