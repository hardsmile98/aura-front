import type { Translations } from "@/lib/translations";
import type { QuizIconName, InfoSlideIconName } from "./quizIcons";

export type QuizState = {
  step: number;
  gender: string;
  interest: string;
  idealAge: string;
  appearanceType: string;
  appearanceImportant: string;
  soulmatePriority: string;
  birthDate: string;
  element: string;
  decisionType: string;
  personalDifficulty: string;
  relationshipRedFlag: string;
  partnerType: string;
  idealRelationships: string;
  loveExpression: string;
  idealPartnerRelationships: string;
  relationshipFear: string;
  sharedGoals: string[];
};

export type QuizStepSelectOption = {
  value: string;
  labelKey: keyof Translations["soulmate"]["quiz"];
  icon?: QuizIconName;
};

export type QuizStepConfig =
  | {
      type: "select";
      field: keyof Omit<QuizState, "step" | "sharedGoals">;
      titleKey: keyof Translations["soulmate"]["quiz"];
      options: QuizStepSelectOption[];
      layout?: "vertical" | "horizontal" | "verticalIcons" | "horizontalIcons" | "emoji";
      autoAdvance?: boolean;
      submitLabelKey?: keyof Translations["soulmate"]["quiz"];
    }
  | {
      type: "date";
      field: keyof Omit<QuizState, "step" | "sharedGoals">;
      titleKey: keyof Translations["soulmate"]["quiz"];
      nextLabelKey: keyof Translations["soulmate"]["quiz"];
      placeholderKey?: keyof Translations["soulmate"]["quiz"];
    }
  | {
      type: "multiselect";
      field: "sharedGoals";
      titleKey: keyof Translations["soulmate"]["quiz"];
      options: QuizStepSelectOption[];
      submitLabelKey: keyof Translations["soulmate"]["quiz"];
    };

export const QUIZ_STEPS: QuizStepConfig[] = [
  {
    type: "select",
    field: "gender",
    titleKey: "step1Title",
    options: [
      { value: "male", labelKey: "step1OptionMale", icon: "male" },
      { value: "female", labelKey: "step1OptionFemale", icon: "female" },
    ],
    layout: "horizontalIcons",
    autoAdvance: true,
  },
  {
    type: "select",
    field: "interest",
    titleKey: "step2Title",
    options: [
      { value: "men", labelKey: "step2Option1", icon: "male" },
      { value: "women", labelKey: "step2Option2", icon: "female" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "idealAge",
    titleKey: "step3Title",
    options: [
      { value: "20-30", labelKey: "step3Option1" },
      { value: "30-40", labelKey: "step3Option2" },
      { value: "40-50", labelKey: "step3Option3" },
      { value: "50+", labelKey: "step3Option4" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "appearanceType",
    titleKey: "step4Title",
    options: [
      { value: "european", labelKey: "step4Option1" },
      { value: "latino", labelKey: "step4Option2" },
      { value: "african", labelKey: "step4Option3" },
      { value: "asian", labelKey: "step4Option4" },
      { value: "no-preference", labelKey: "step4Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "appearanceImportant",
    titleKey: "step5Title",
    options: [
      { value: "1", labelKey: "step5Option1" },
      { value: "2", labelKey: "step5Option2" },
      { value: "3", labelKey: "step5Option3" },
      { value: "4", labelKey: "step5Option4" },
      { value: "5", labelKey: "step5Option5" },
    ],
    layout: "emoji",
    autoAdvance: true,
  },
  {
    type: "select",
    field: "soulmatePriority",
    titleKey: "step6Title",
    options: [
      { value: "kindness", labelKey: "step6Option1" },
      { value: "loyalty", labelKey: "step6Option2" },
      { value: "intelligence", labelKey: "step6Option3" },
      { value: "creativity", labelKey: "step6Option4" },
      { value: "passion", labelKey: "step6Option5" },
      { value: "empathy", labelKey: "step6Option6" },
    ],
    autoAdvance: true,
  },
  {
    type: "date",
    field: "birthDate",
    titleKey: "step7Title",
    nextLabelKey: "next",
    placeholderKey: "step7Placeholder",
  },
  {
    type: "select",
    field: "element",
    titleKey: "step8Title",
    options: [
      { value: "fire", labelKey: "step8Option1" },
      { value: "water", labelKey: "step8Option2" },
      { value: "earth", labelKey: "step8Option3" },
      { value: "air", labelKey: "step8Option4" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "decisionType",
    titleKey: "step9Title",
    options: [
      { value: "head", labelKey: "step9Option1" },
      { value: "heart", labelKey: "step9Option2" },
      { value: "depends", labelKey: "step9Option3" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "personalDifficulty",
    titleKey: "step10Title",
    options: [
      { value: "trust", labelKey: "step10Option1" },
      { value: "find-the-one", labelKey: "step10Option2" },
      { value: "keep-spark", labelKey: "step10Option3" },
      { value: "understand-needs", labelKey: "step10Option4" },
      { value: "let-go-past", labelKey: "step10Option5" },
      { value: "uncertainty", labelKey: "step10Option6" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "relationshipRedFlag",
    titleKey: "step11Title",
    options: [
      { value: "distrust", labelKey: "step11Option1" },
      { value: "communication", labelKey: "step11Option2" },
      { value: "jealousy", labelKey: "step11Option3" },
      { value: "disrespect", labelKey: "step11Option4" },
      { value: "inconsistency", labelKey: "step11Option5" },
      { value: "egocentrism", labelKey: "step11Option6" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "partnerType",
    titleKey: "step12Title",
    options: [
      { value: "similar", labelKey: "step12Option1" },
      { value: "opposite", labelKey: "step12Option2" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "idealRelationships",
    titleKey: "step13Title",
    options: [
      { value: "partnership", labelKey: "step13Option1" },
      { value: "friendship", labelKey: "step13Option2" },
      { value: "adventurous", labelKey: "step13Option3" },
      { value: "deep-connection", labelKey: "step13Option4" },
      { value: "growth-together", labelKey: "step13Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "loveExpression",
    titleKey: "step14Title",
    options: [
      { value: "words", labelKey: "step14Option1" },
      { value: "actions", labelKey: "step14Option2" },
      { value: "gifts", labelKey: "step14Option3" },
      { value: "time", labelKey: "step14Option4" },
      { value: "touch", labelKey: "step14Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "idealPartnerRelationships",
    titleKey: "step15Title",
    options: [
      { value: "deep-close", labelKey: "step15Option1" },
      { value: "fun-adventurous", labelKey: "step15Option2" },
      { value: "supportive", labelKey: "step15Option3" },
      { value: "passionate", labelKey: "step15Option4" },
      { value: "calm-reliable", labelKey: "step15Option5" },
      { value: "growth-open", labelKey: "step15Option6" },
      { value: "other", labelKey: "step15Option7" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "relationshipFear",
    titleKey: "step16Title",
    options: [
      { value: "lose-trust", labelKey: "step16Option1" },
      { value: "drift-apart", labelKey: "step16Option2" },
      { value: "misunderstood", labelKey: "step16Option3" },
      { value: "lack-involvement", labelKey: "step16Option4" },
      { value: "vulnerable", labelKey: "step16Option5" },
      { value: "hurt-again", labelKey: "step16Option6" },
      { value: "other", labelKey: "step16Option7" },
    ],
    autoAdvance: true,
  },
  {
    type: "multiselect",
    field: "sharedGoals",
    titleKey: "step17Title",
    options: [
      { value: "family", labelKey: "step17Option1" },
      { value: "travel", labelKey: "step17Option2" },
      { value: "business", labelKey: "step17Option3" },
      { value: "development", labelKey: "step17Option4" },
      { value: "financial", labelKey: "step17Option5" },
      { value: "positive-change", labelKey: "step17Option6" },
      { value: "other", labelKey: "step17Option7" },
    ],
    submitLabelKey: "submit",
  },
];

/** Информационные слайды между шагами (не считаются в прогрессе) */
export type InfoSlideConfig = {
  afterStep: number;
  titleKey: string;
  /** Иконка слайда */
  icon: InfoSlideIconName;
  /** Поле из QuizState для выбора описания по значению */
  descriptionByValue: Record<string, string>;
};

export const INFO_SLIDES: InfoSlideConfig[] = [
  {
    afterStep: 6,
    titleKey: "slide1Title",
    icon: "target",
    descriptionByValue: {
      kindness: "slide1DescKindness",
      loyalty: "slide1DescLoyalty",
      intelligence: "slide1DescIntelligence",
      creativity: "slide1DescCreativity",
      passion: "slide1DescPassion",
      empathy: "slide1DescEmpathy",
    },
  },
  {
    afterStep: 9,
    titleKey: "slide2Title",
    icon: "sparkles",
    descriptionByValue: {
      head: "slide2DescHead",
      heart: "slide2DescHeart",
      depends: "slide2DescOther",
    },
  },
  {
    afterStep: 10,
    titleKey: "slide3Title",
    icon: "heart",
    descriptionByValue: {
      trust: "slide3DescTrust",
      "find-the-one": "slide3DescFindTheOne",
      "keep-spark": "slide3DescKeepSpark",
      "understand-needs": "slide3DescUnderstandNeeds",
      "let-go-past": "slide3DescLetGoPast",
      uncertainty: "slide3DescUncertainty",
    },
  },
];

export const INITIAL_QUIZ_STATE: QuizState = {
  step: 1,
  gender: "",
  interest: "",
  idealAge: "",
  appearanceType: "",
  appearanceImportant: "",
  soulmatePriority: "",
  birthDate: "",
  element: "",
  decisionType: "",
  personalDifficulty: "",
  relationshipRedFlag: "",
  partnerType: "",
  idealRelationships: "",
  loveExpression: "",
  idealPartnerRelationships: "",
  relationshipFear: "",
  sharedGoals: [],
};
