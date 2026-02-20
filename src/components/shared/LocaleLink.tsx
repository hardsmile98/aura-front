import { Link } from "react-router-dom";
import type { Locale } from "@/lib/translations";
import { setStoredLocale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

/**
 * Link that saves the target locale to localStorage on click.
 * Use for language switcher links.
 */
export function LocaleLink({ locale, to, className, children, onClick }: Props) {
  return (
    <Link
      to={to}
      className={className}
      onClick={() => {
        setStoredLocale(locale);
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
