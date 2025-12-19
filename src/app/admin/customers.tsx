import { View, Text } from "react-native";

export default function AdminCustomersScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Customers</Text>
      {/* TODO: list/filter customers */}
    </View>
  );
}
