import { defaultLocale } from '@/lib/i18n';
import { RedirectWithParams } from '@/components/shared';

export function NotFoundPage() {
  return <RedirectWithParams to={`/${defaultLocale}/soulmate/welcome`} />;
}
