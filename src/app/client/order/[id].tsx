import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ClientOrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>รายละเอียดออเดอร์</Text>
      <Text style={{ color: "#6b7280" }}>Order ID: {id}</Text>
      {/* TODO: show items, status, ETA, truck */}
    </View>
  );
}
