import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, UserRole } from "src/types/auth";

type Actions = {
  setAuth: (p: { token: string; role: UserRole; user?: any }) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

const initial: AuthState = {
  token: null,
  role: null,
  user: null,
  loading: true,
};

export const useAuthStore = create<AuthState & Actions>((set, get) => ({
  ...initial,
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem("@auth");
      if (raw) {
        const { token, role, user } = JSON.parse(raw);
        set({ token, role, user, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },
  setAuth: async ({ token, role, user }) => {
    await AsyncStorage.setItem(
      "@auth",
      JSON.stringify({ token, role, user: user ?? null })
    );
    set({ token, role, user: user ?? null });
  },
  logout: async () => {
    await AsyncStorage.removeItem("@auth");
    set({ token: null, role: null, user: null });
  },
}));
