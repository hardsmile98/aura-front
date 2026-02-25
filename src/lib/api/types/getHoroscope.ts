export type GetHoroscopeResponse =
  | {
      status: 'pending';
    }
  | {
      status: 'failed';
      error?: string;
    }
  | {
      status: 'completed';
      horoscope: {
        love: string;
        career: string;
        health: string;
        finance: string;
        family: string;
        travel: string;
      };
    };
