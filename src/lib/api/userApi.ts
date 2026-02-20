import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_JWT_KEY } from '../auth';
import { clearAuth } from '../authSlice';
import { GetProfileResponse } from './types';

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

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithLogout,
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: '/api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = userApi;
