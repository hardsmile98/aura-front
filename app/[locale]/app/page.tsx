import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale || defaultLocale}/app/horoscopes`);
}
