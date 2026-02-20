import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultLocale, getStoredLocale } from "@/lib/i18n";

/**
 * Redirect from root (/) to /{locale}.
 * Uses stored locale from localStorage if available, otherwise defaultLocale.
 */
export function RootRedirect() {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const locale = getStoredLocale() ?? defaultLocale;
  
    const target = location.search ? `/${locale}${location.search}` : `/${locale}`;
  
    navigate(target, { replace: true });
  }, [navigate, location.search]);

  return null;
}
