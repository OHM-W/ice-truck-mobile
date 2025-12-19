import { View, Text } from "react-native";

export default function AdminSettingsScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>System Settings</Text>
      {/* TODO: units, locale, SLA, zones */}
    </View>
  );
}
