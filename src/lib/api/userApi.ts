import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_JWT_KEY } from '../auth';
import { GetProfileResponse } from './types';

const baseUrl = import.meta.env.VITE_API_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(AUTH_JWT_KEY);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
