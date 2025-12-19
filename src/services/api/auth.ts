import { http } from "./http";

export type LoginResp = {
  token: string;
  user: { id: string; name: string; role?: string };
};

export async function login(username: string, password: string) {
  const { data } = await http.post<LoginResp>("/auth/login", {
    username,
    password,
  });
  return data;
}

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  role: "admin" | "client";
};

export async function register(payload: RegisterPayload) {
  const { data } = await http.post<LoginResp>("/auth/register", payload);
  return data;
}
