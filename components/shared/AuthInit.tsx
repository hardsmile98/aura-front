'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/lib/store';
import { hydrateFromStorage } from '@/lib/authSlice';

/**
 * Hydrates auth state from localStorage on app load.
 * JWT stays in LS, isAuthorized is synced to Redux store.
 */
export function AuthInit() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  return null;
}
