import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@src/store/auth.store";
import { colors } from "@src/theme/colors";

export default function ClientHome() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>หน้าลูกค้า</Text>
      {/* TODO: ใส่ tracking ออเดอร์ของลูกค้า / ประวัติ */}
      <Pressable onPress={() => router.push("/client/order/[id]")} style={btn}>
        <Text style={btnText}>ออเดอร์ของฉัน</Text>
      </Pressable>
      <Pressable
        onPress={logout}
        style={[btn, { backgroundColor: colors.colors.danger }]}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>ออกจากระบบ</Text>
      </Pressable>
    </View>
  );
}
const btn = {
  backgroundColor: colors.colors.primary,
  padding: 14,
  borderRadius: 12,
  alignItems: "center",
} as const;
const btnText = { color: "#fff", fontWeight: "700" } as const;
