import { createSlice } from '@reduxjs/toolkit';
import { setAuthJWT, removeAuthJWT, AUTH_JWT_KEY } from './auth';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: false,
  },
  reducers: {
    setAuth: (state, action: { payload: string }) => {
      setAuthJWT(action.payload);
      state.isAuthorized = true;
    },
    clearAuth: (state) => {
      removeAuthJWT();
      state.isAuthorized = false;
    },
    hydrateFromStorage: (state) => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem(AUTH_JWT_KEY);
      state.isAuthorized = Boolean(token && token.length > 0);
    },
  },
});

export const { setAuth, clearAuth, hydrateFromStorage } = authSlice.actions;
