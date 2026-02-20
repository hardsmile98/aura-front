import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/authApi';
import { userApi } from '@/lib/api/userApi';
import { authSlice } from '@/lib/auth';
import { quizSlice } from './quizSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authSlice.reducer,
    quiz: quizSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { setQuizResult, clearQuizResult } from './quizSlice';
