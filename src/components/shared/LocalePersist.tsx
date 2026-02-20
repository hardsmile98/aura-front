import { useEffect } from "react";
import type { Locale } from "@/lib/translations";
import { isValidLocale, setStoredLocale } from "@/lib/i18n";

type Props = { locale: string };

/**
 * Saves the current locale to localStorage when the user lands on a [locale] page.
 * Ensures stored preference stays in sync with the URL (e.g. bookmarks, direct links).
 */
export function LocalePersist({ locale }: Props) {
  useEffect(() => {
    if (isValidLocale(locale)) {
      setStoredLocale(locale as Locale);
    }
  }, [locale]);

  return null;
}
