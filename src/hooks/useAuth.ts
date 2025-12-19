import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROLES, type UserRole } from "src/constants/roles";

type AuthState = {
  token: string | null;
  role: UserRole | null;
  user: any | null;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    token: null,
    role: null,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  // โหลดสถานะจาก Storage ตอนเปิดแอป
  useEffect(() => {
    (async () => {
      try {
        const [token, role, user] = await Promise.all([
          AsyncStorage.getItem("auth.token"),
          AsyncStorage.getItem("auth.role"),
          AsyncStorage.getItem("auth.user"),
        ]);
        setState({
          token,
          role: (role as UserRole) ?? null,
          user: user ? JSON.parse(user) : null,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setAuth = useCallback(
    async (p: { token: string; role: UserRole; user?: any }) => {
      await Promise.all([
        AsyncStorage.setItem("auth.token", p.token),
        AsyncStorage.setItem("auth.role", p.role),
        AsyncStorage.setItem("auth.user", JSON.stringify(p.user ?? null)),
      ]);
      setState({ token: p.token, role: p.role, user: p.user ?? null });
    },
    []
  );

  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem("auth.token"),
      AsyncStorage.removeItem("auth.role"),
      AsyncStorage.removeItem("auth.user"),
    ]);
    setState({ token: null, role: null, user: null });
  }, []);

  return { ...state, loading, setAuth, logout, ROLES };
}
