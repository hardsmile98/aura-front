"use client";

import { useEffect } from "react";
import { defaultLocale, getStoredLocale } from "@/lib/i18n";

/**
 * Client-side redirect from root (/) to /{locale}.
 * Uses stored locale from localStorage if available, otherwise defaultLocale.
 */
export function RootRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const locale = getStoredLocale() ?? defaultLocale;
    const search = window.location.search;
    const target = search ? `/${locale}?${search}` : `/${locale}`;

    window.location.replace(target);
  }, []);

  return null;
}
