type GetProfileResponse = {
  id: number;
  email: string;
  locale: string;
  subscription: string;
  stripeCustomerId: string;
  stripePaymentMethodId: string;
  subscriptionEndsAt: string | null;
  quizResult: {
    gender: string;
    element: string;
    idealAge: string;
    interest: string;
    birthDate: string;
    partnerType: string;
    sharedGoals: string[];
    decisionType: string;
    appearanceType: string;
    loveExpression: string;
    psychicArtistry: string;
    spiritualPerson: string;
    relationshipFear: string;
    soulmatePriority: string;
    idealRelationships: string;
    personalDifficulty: string;
    appearanceImportant: string;
    relationshipRedFlag: string;
    idealPartnerRelationships: string;
  };
  createdAt: string;
};

export type { GetProfileResponse };
