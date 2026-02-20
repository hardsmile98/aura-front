import { createSlice } from '@reduxjs/toolkit';
import type { QuizState } from '@/components/quiz';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: null as QuizState | null,
  reducers: {
    setQuizResult: (_, action: { payload: QuizState }) => action.payload,
    clearQuizResult: () => null,
  },
});

export const { setQuizResult, clearQuizResult } = quizSlice.actions;
