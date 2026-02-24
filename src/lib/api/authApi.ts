import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    sendLink: builder.mutation<void, { email: string; locale: string }>({
      query: ({ email, locale }) => ({
        url: '/api/auth/send-link',
        method: 'POST',
        body: { email },
        headers: {
          'x-locale': locale,
        },
      }),
    }),
    verify: builder.mutation<{ accessToken: string, }, { token: string, locale: string }>({
      query: ({ token, locale }) => ({
        url: '/api/auth/verify',
        method: 'POST',
        body: { token },
        headers: {
          'x-locale': locale,
        },
      }),
    }),
    lead: builder.mutation<
      { accessToken: string },
      { email: string; locale: string; quizResult: Record<string, unknown> }
    >({
      query: ({ email, locale, quizResult }) => ({
        url: '/api/auth/lead',
        method: 'POST',
        body: { email, quizResult, locale },
        headers: {
          'x-locale': locale,
        },
      }),
    }),
  }),
});

export const { useSendLinkMutation, useVerifyMutation, useLeadMutation } = authApi;
