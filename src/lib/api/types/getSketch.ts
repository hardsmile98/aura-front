export type GetSketchResponse = {
  sketch: {
    [key: string]: string;
  }
};

export const SOULMATE_SECTION_KEYS = [
  'intro',
  'nameInitials',
  'soulmateSign',
  'compatibleSigns',
  'auraDescription',
  'personalityTraits',
  'spiritualAlignment',
  'jobAndCareer',
  'impactAndMission',
  'whenAndWhereMeet',
  'pastLifeConnection',
  'tarotCompatibility',
  'spiritualSymbols',
  'conclusion',
] as const;

export type SoulmateSectionKey = (typeof SOULMATE_SECTION_KEYS)[number];

/** Связанные секции отчёта для группировки в блоки */
export const SOULMATE_SECTION_GROUPS: SoulmateSectionKey[][] = [
  ["intro"],
  ["nameInitials", "soulmateSign"],
  ["compatibleSigns", "auraDescription"],
  ["personalityTraits", "spiritualAlignment"],
  ["jobAndCareer", "impactAndMission"],
  ["whenAndWhereMeet", "pastLifeConnection"],
  ["tarotCompatibility", "spiritualSymbols"],
  ["conclusion"],
];

export const BABY_SECTION_KEYS = [
  'intro',
  'nameAndPersonality',
  'whenAndHowBorn',
  'personalityAndCharacter',
  'futureSuccessAndCareer',
  'parentChildBond',
  'firstYearsGuide',
  'conclusion',
] as const;

export type BabySectionKey = (typeof BABY_SECTION_KEYS)[number];

export const BABY_SECTION_GROUPS: BabySectionKey[][] = [
  ['intro'],
  ['nameAndPersonality'],
  ['whenAndHowBorn'],
  ['personalityAndCharacter'],
  ['futureSuccessAndCareer'],
  ['parentChildBond'],
  ['firstYearsGuide'],
  ['conclusion'],
];
