import { View, Text } from "react-native";

export default function ForgotPasswordScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>ลืมรหัสผ่าน</Text>
      {/* TODO: form ขอ reset link */}
    </View>
  );
}
