import { View, Text } from "react-native";

export default function ClientOrdersScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>ออเดอร์ของฉัน</Text>
      {/* TODO: list orders of current user */}
    </View>
  );
}
