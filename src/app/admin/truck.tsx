import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTrucks } from "@src/hooks/useTrucks";

export default function AdminTrucks() {
  const { data, loading, error } = useTrucks(4000);
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        ยานพาหนะทั้งหมด
      </Text>
      {loading ? <Text>กำลังโหลด...</Text> : null}
      {error ? <Text style={{ color: "#ef4444" }}>{error}</Text> : null}
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/admin/trucks/${item.id}`)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 14,
              padding: 14,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              {item.name} • {item.plateNo}
            </Text>
            <Text style={{ color: "#6b7280" }}>
              สถานะ: {item.status} | อุณหภูมิ: {item.cargoTempC ?? "-"} °C
            </Text>
            <Text style={{ color: "#94a3b8" }}>
              อัปเดตล่าสุด: {item.lastSeenAt ?? "-"}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
