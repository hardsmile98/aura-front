import { HoroscopeIcon, ExpertIcon, BookIcon } from '@/components/icons';

export type AccountMenuLabelKey = 'horoscopes' | 'insights' | 'expertHelp';

export const ACCOUNT_MENU_ITEMS = [
  { path: 'horoscopes', labelKey: 'horoscopes' as AccountMenuLabelKey, Icon: HoroscopeIcon },
  { path: 'insights', labelKey: 'insights' as AccountMenuLabelKey, Icon: BookIcon },
  { path: 'expert', labelKey: 'expertHelp' as AccountMenuLabelKey, Icon: ExpertIcon },
] as const;
