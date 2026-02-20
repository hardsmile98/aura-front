import { HoroscopeIcon, ExpertIcon } from '@/components/icons';

export type AccountMenuLabelKey = 'horoscopes' | 'expertHelp';

export const ACCOUNT_MENU_ITEMS = [
  { path: 'horoscopes', labelKey: 'horoscopes' as AccountMenuLabelKey, Icon: HoroscopeIcon },
  { path: 'expert', labelKey: 'expertHelp' as AccountMenuLabelKey, Icon: ExpertIcon },
] as const;
