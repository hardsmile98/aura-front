import { createSlice } from '@reduxjs/toolkit';
import { setAuthJWT, removeAuthJWT, isAuthorized } from './storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthorized: isAuthorized(),
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
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
