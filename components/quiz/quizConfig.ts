import type { Translations } from "@/lib/translations";
import type { QuizIconName } from "./quizIcons";

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
    layout: "verticalIcons",
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
    layout: "horizontalIcons",
    autoAdvance: true,
  },
  {
    type: "select",
    field: "idealAge",
    titleKey: "step3Title",
    options: [
      { value: "18-25", labelKey: "step3Option1" },
      { value: "26-35", labelKey: "step3Option2" },
      { value: "36-45", labelKey: "step3Option3" },
      { value: "46-55", labelKey: "step3Option4" },
      { value: "56+", labelKey: "step3Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "appearanceType",
    titleKey: "step4Title",
    options: [
      { value: "romantic", labelKey: "step4Option1" },
      { value: "sporty", labelKey: "step4Option2" },
      { value: "classic", labelKey: "step4Option3" },
      { value: "creative", labelKey: "step4Option4" },
      { value: "natural", labelKey: "step4Option5" },
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
      { value: "connection", labelKey: "step6Option1" },
      { value: "interests", labelKey: "step6Option2" },
      { value: "trust", labelKey: "step6Option3" },
      { value: "adventure", labelKey: "step6Option4" },
      { value: "support", labelKey: "step6Option5" },
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
      { value: "fire", labelKey: "step8Option1", icon: "fire" },
      { value: "water", labelKey: "step8Option2", icon: "water" },
      { value: "earth", labelKey: "step8Option3", icon: "earth" },
      { value: "air", labelKey: "step8Option4", icon: "air" },
    ],
    layout: "horizontalIcons",
    autoAdvance: true,
  },
  {
    type: "select",
    field: "decisionType",
    titleKey: "step9Title",
    options: [
      { value: "head", labelKey: "step9Option1", icon: "brain" },
      { value: "heart", labelKey: "step9Option2", icon: "heart" },
      { value: "depends", labelKey: "step9Option3" },
    ],
    layout: "horizontalIcons",
    autoAdvance: true,
  },
  {
    type: "select",
    field: "personalDifficulty",
    titleKey: "step10Title",
    options: [
      { value: "trust", labelKey: "step10Option1" },
      { value: "communication", labelKey: "step10Option2" },
      { value: "self-doubt", labelKey: "step10Option3" },
      { value: "vulnerability", labelKey: "step10Option4" },
      { value: "past", labelKey: "step10Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "relationshipRedFlag",
    titleKey: "step11Title",
    options: [
      { value: "dishonesty", labelKey: "step11Option1" },
      { value: "disrespect", labelKey: "step11Option2" },
      { value: "unavailable", labelKey: "step11Option3" },
      { value: "controlling", labelKey: "step11Option4" },
      { value: "uncommitted", labelKey: "step11Option5" },
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
      { value: "passionate", labelKey: "step13Option1" },
      { value: "calm", labelKey: "step13Option2" },
      { value: "adventurous", labelKey: "step13Option3" },
      { value: "spiritual", labelKey: "step13Option4" },
      { value: "playful", labelKey: "step13Option5" },
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
      { value: "friends", labelKey: "step15Option1" },
      { value: "independent", labelKey: "step15Option2" },
      { value: "traditional", labelKey: "step15Option3" },
      { value: "unconventional", labelKey: "step15Option4" },
      { value: "growth", labelKey: "step15Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "select",
    field: "relationshipFear",
    titleKey: "step16Title",
    options: [
      { value: "betrayal", labelKey: "step16Option1" },
      { value: "losing", labelKey: "step16Option2" },
      { value: "rejection", labelKey: "step16Option3" },
      { value: "boredom", labelKey: "step16Option4" },
      { value: "hurt", labelKey: "step16Option5" },
    ],
    autoAdvance: true,
  },
  {
    type: "multiselect",
    field: "sharedGoals",
    titleKey: "step17Title",
    options: [
      { value: "family", labelKey: "step17Option1" },
      { value: "career", labelKey: "step17Option2" },
      { value: "travel", labelKey: "step17Option3" },
      { value: "development", labelKey: "step17Option4" },
      { value: "creative", labelKey: "step17Option5" },
      { value: "financial", labelKey: "step17Option6" },
      { value: "spiritual", labelKey: "step17Option7" },
      { value: "health", labelKey: "step17Option8" },
    ],
    submitLabelKey: "submit",
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
