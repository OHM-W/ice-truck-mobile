import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@src/store/auth.store";
import { colors } from "@src/theme/colors";

/**
 * Root layout + Guard
 * - ถ้าไม่มี token -> ส่งไป /auth/login
 * - ถ้ามี token -> redirect ตาม role
 */
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  // ดึง state + action จาก store
  const { token, role, loading, hydrate } = useAuthStore();

  // โหลดค่าจาก AsyncStorage (@auth) ครั้งแรกตอนแอปเปิด
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    // ยังโหลด state ไม่เสร็จ อย่าเพิ่ง redirect
    if (loading) return;

    const inAuth = segments[0] === "auth";

    if (!token) {
      if (!inAuth) {
        router.replace("/auth/login");
      }
      return;
    }

    // มี token แล้ว: บังคับไปตาม role
    if (role === "admin" && segments[0] !== "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "client" && segments[0] !== "client") {
      router.replace("/client/home");
    }
  }, [token, role, loading, segments, router]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.colors.background }}>
      <Slot />
    </SafeAreaView>
  );
}
