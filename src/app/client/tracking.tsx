// app/client/tracking.tsx
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { listOrders, Order } from "@src/services/api/orders";
export default function ClientTracking() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [code, setCode] = useState("");
  useEffect(() => {
  listOrders()
      .then(setOrders)
      .catch(() => {});
  }, []);
  const o = orders.find((x) => x.code === code);
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>ติดตามการส่ง</Text>
      <TextInput
        placeholder="รหัสคำสั่งซื้อ"
        value={code}
        onChangeText={setCode}
        style={{
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 12,
          padding: 12,
        }}
      />
      {o ? (
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            padding: 16,
          }}
        >
          <Text style={{ fontWeight: "700" }}>Order • {o.code}</Text>
          <Text style={{ color: "#6b7280" }}>สถานะ: {o.status}</Text>
          <Text style={{ color: "#6b7280" }}>
            รถ: {o.assignedTruckId ?? "-"}
          </Text>
          <Text style={{ color: "#6b7280" }}>ETA: {o.eta ?? "-"}</Text>
          <Pressable
            style={{
              marginTop: 10,
              backgroundColor: "#22d3ee",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontWeight: "700", textAlign: "center" }}>
              ดูแผนที่
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text style={{ color: "#94a3b8" }}>พิมพ์โค้ดเพื่อดูสถานะ</Text>
      )}
    </View>
  );
}
