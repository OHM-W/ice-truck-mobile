import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { login } from "@src/services/api/auth";
import { useAuth } from "@src/hooks/useAuth";

export default function LoginForm() {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await login({ email, password });
      setAuth(res.token, res.role);
      // เสร็จแล้ว _layout จะ redirect ให้เองตาม role
    } catch (e: any) {
      setErr(e?.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: 12 }}>
      <TextInput
        placeholder="อีเมล"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
      />
      <TextInput
        placeholder="รหัสผ่าน"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderRadius: 8, padding: 12 }}
      />
      {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={{ backgroundColor: "#1e90ff", padding: 14, borderRadius: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </Text>
      </Pressable>
    </View>
  );
}
