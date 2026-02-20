'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { AuthInit } from '@/components/shared/AuthInit';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInit />
      {children}
    </Provider>
  );
}
