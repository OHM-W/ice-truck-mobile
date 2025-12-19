import { View, Text } from "react-native";

export default function AdminOrdersScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>All Orders</Text>
      {/* TODO: table + status filter + assign truck */}
    </View>
  );
}
