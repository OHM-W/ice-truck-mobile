import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { login } from "@src/services/api/auth";
import { colors } from "@src/theme/colors";
import { useAuthStore } from "@src/store/auth.store";
import TruckIcon from "@/../assets/truck.svg";
// ถ้าไม่มี alias ใช้: import { login } from "../services/api/auth";

export default function LoginScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit() {
    setErr(null);
    setSuccess(null);
    setLoading(true);
    try {
      const { token, user } = await login(email.trim(), password);
      console.log("Login success:", { token, user });
      // บันทึกลง global auth store + AsyncStorage ผ่าน store
      await setAuth({
        token,
        role: (user?.role as any) || "client", // ถ้าไม่มี role ให้ default เป็น client
        user,
      });
      setSuccess("เข้าสู่ระบบสำเร็จ");
      // ไม่ต้องเด้งไป /home (ไม่มี route) ให้กลับ root แล้วให้ guard จัดการต่อ
      router.replace("/");
    } catch (e: any) {
      console.log("Login error:", e);
      // จัดการข้อความ error ให้เข้าใจง่าย
      if (e?.response?.status === 404)
        setErr("ไม่พบเส้นทาง /auth/login ที่ BFF (404)");
      else if (e?.response?.status === 401)
        setErr("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (401)");
      else if (e?.message?.includes("Network"))
        setErr("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ตรวจ baseURL และเครือข่าย");
      else setErr("เข้าสู่ระบบล้มเหลว");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#3c5a9a",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      {/* ICON */}
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 55,
          backgroundColor: "rgba(255,255,255,0.15)",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <TruckIcon width={72} height={72} fill="#ffffff" />
      </View>

      {/* TITLE */}
      <Text
        style={{
          color: "#ffffff",
          fontSize: 22,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
      Login
      </Text>

      {/* INPUT */}
      <View style={{ width: "100%", gap: 12 }}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#c7d2fe"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={inputStyle}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#c7d2fe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={inputStyle}
        />
      </View>

      {/* ERROR */}
      {err && <Text style={{ color: "#ffdddd", marginTop: 10 }}>{err}</Text>}

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={onSubmit}
        disabled={loading}
        style={{
          width: "100%",
          backgroundColor: "#243c6a",
          paddingVertical: 14,
          borderRadius: 999,
          alignItems: "center",
          marginTop: 20,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "700" }}>LOGIN</Text>
        )}
      </TouchableOpacity>

      {/* SIGNUP */}
      <TouchableOpacity
        onPress={() => router.push("/auth/register")}
        style={{ marginTop: 16 }}
      >
        <Text style={{ color: "#dbeafe" }}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  backgroundColor: "#ffffff",
  borderRadius: 999,
  paddingVertical: 12,
  paddingHorizontal: 16,
  fontSize: 14,
};
