// src/config/env.ts
import Constants from 'expo-constants';

type Extra = {
  APP_ENV: 'development' | 'staging' | 'production';
  baseURL?: string;
  mockApi?: boolean;
};

const extra = (Constants?.expoConfig?.extra ?? {}) as Partial<Extra>;

// Prefer explicit EXPO_PUBLIC_API_BASE_URL from environment if provided (dev),
// otherwise fall back to expo config extra.baseURL, then to localhost.
const envBase = process.env.EXPO_PUBLIC_API_BASE_URL ?? extra.baseURL ?? 'http://localhost:3000';

export const ENV = {
  APP_ENV: (extra.APP_ENV ?? 'development') as Extra['APP_ENV'],
  BASE_URL: envBase,
  MOCK_API: !!extra.mockApi,
} as const;
