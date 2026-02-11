import { defaultLocale } from "@/lib/i18n";
import { RedirectWithParams } from "@/components/RedirectWithParams";

export default function Home() {
  return <RedirectWithParams to={`/${defaultLocale}/soulmate/welcome`} />;
}
