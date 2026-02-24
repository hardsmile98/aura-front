import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_JWT_KEY, clearAuth } from '@/lib/auth';

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
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    createSetupIntent: builder.mutation<{ clientSecret: string }, void>({
      query: () => ({
        url: '/api/payments/create-setup-intent',
        method: 'POST',
      }),
    }),

    subscribe: builder.mutation<void, { paymentMethodId: string }>({
      query: ({ paymentMethodId }) => ({
        url: '/api/payments/subscribe',
        method: 'POST',
        body: { paymentMethodId },
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useCreateSetupIntentMutation,
  useSubscribeMutation,
} = paymentsApi;
