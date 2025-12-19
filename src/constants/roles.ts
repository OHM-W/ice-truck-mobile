// roles.ts
export type UserRole = 'admin' | 'client';
export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const;
