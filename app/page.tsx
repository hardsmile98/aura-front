import { defaultLocale } from "@/lib/i18n";
import { RedirectWithParams } from "@/components/shared";

export default function Home() {
  return <RedirectWithParams to={`/${defaultLocale}`} />;
}
