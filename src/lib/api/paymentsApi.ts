import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_JWT_KEY, clearAuth } from '@/lib/auth';
import { userApi } from './userApi';

const baseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(AUTH_JWT_KEY);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithLogout: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    api.dispatch(clearAuth());
  }
  return result;
};

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    createSetupIntent: builder.mutation<{ clientSecret: string }, { locale: string }>({
      query: ({ locale }) => ({
        url: '/api/payments/create-setup-intent',
        method: 'POST',
        params: { locale },
      }),
    }),

    subscribe: builder.mutation<void, { paymentMethodId: string; locale: string }>({
      query: ({ paymentMethodId, locale }) => ({
        url: '/api/payments/subscribe',
        method: 'POST',
        body: { paymentMethodId },
        params: { locale },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userApi.util.invalidateTags(['Profile']));
      },
    }),

    cancelSubscription: builder.mutation<void, { locale: string }>({
      query: ({ locale }) => ({
        url: '/api/payments/cancel-subscription',
        method: 'POST',
        params: { locale },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(userApi.util.invalidateTags(['Profile']));
      },
    }),
  }),
});

export const {
  useCreateSetupIntentMutation,
  useSubscribeMutation,
  useCancelSubscriptionMutation,
} = paymentsApi;
