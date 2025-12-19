export type Role = "admin" | "client";
export type User = { id: string; email: string; name: string };
export type LoginDTO = { email: string; password: string };
export type UserRole = "admin" | "client";
export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string; role: UserRole };
export type MeResponse = {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
};
export interface AuthState {
  token: string | null;
  role: UserRole | null;
  user: any | null;
  loading: boolean;        
}