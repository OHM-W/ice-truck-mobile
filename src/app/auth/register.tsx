import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { register } from "@src/services/api/auth";
import { colors } from "@src/theme/colors";
import { useAuthStore } from "@src/store/auth.store";

export default function RegisterScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "client">("client");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit() {
    setErr(null);
    setLoading(true);
    try {
      const { token, user } = await register({
        username: username.trim(),
        email: email.trim(),
        password,
        role,
      });

      await setAuth({
        token,
        role: (user.role as any) || "client",
        user,
      });

      router.replace("/");
    } catch (e: any) {
      if (e?.response?.status === 409) {
        setErr("username หรือ email นี้ถูกใช้แล้ว");
      } else {
        setErr("สมัครใช้งานไม่สำเร็จ");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#051423",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#e8f4ff",
          fontSize: 28,
          fontWeight: "800",
          marginBottom: 12,
        }}
      >
        สมัครใช้งาน
      </Text>

      <Text style={{ color: colors.colors.textMuted }}>ชื่อผู้ใช้</Text>
      <TextInput
        placeholder="username"
        placeholderTextColor="#6b7280"
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: "#0d2238",
          color: "#e8f4ff",
          borderRadius: 12,
          padding: 12,
          marginBottom: 10,
        }}
      />

      <Text style={{ color: colors.colors.textMuted }}>อีเมล</Text>
      <TextInput
        placeholder="email"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "#0d2238",
          color: "#e8f4ff",
          borderRadius: 12,
          padding: 12,
          marginBottom: 10,
        }}
      />

      <Text style={{ color: colors.colors.textMuted }}>รหัสผ่าน</Text>
      <TextInput
        placeholder="password"
        placeholderTextColor="#6b7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#0d2238",
          color: "#e8f4ff",
          borderRadius: 12,
          padding: 12,
          marginBottom: 10,
        }}
      />

      {/* ปุ่มเลือก role */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginBottom: 10,
        }}
      >
        {(["client", "admin"] as const).map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRole(r)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: role === r ? colors.colors.primary : "#374151",
              backgroundColor:
                role === r ? "rgba(37,215,255,0.1)" : "transparent",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#e8f4ff" }}>
              {r === "client" ? "ลูกค้า" : "แอดมิน"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {err && <Text style={{ color: "#ff6b6b", marginBottom: 10 }}>{err}</Text>}

      <TouchableOpacity
        onPress={onSubmit}
        disabled={loading}
        style={{
          backgroundColor: "#25d7ff",
          opacity: loading ? 0.6 : 1,
          padding: 14,
          borderRadius: 14,
          alignItems: "center",
          marginTop: 8,
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "#002431", fontWeight: "700" }}>
            สมัครและเข้าสู่ระบบ
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
