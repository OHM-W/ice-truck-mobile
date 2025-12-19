import { View, Text, FlatList, Pressable } from "react-native";
import { useStats } from "@src/hooks/useStats";
import { useAlerts } from "@src/hooks/useAlerts";
import { useAuthStore } from "@src/store/auth.store";
import { colors } from "@src/theme/colors";

// แยก Component ย่อยออกมาแบบนี้ ดีมากครับ (Clean Code)
function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={{
      flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 14,
      borderWidth: 1, borderColor: "#e5e7eb"
    }}>
      <Text style={{ color: "#6b7280", marginBottom: 6 }}>{label}</Text>
      <Text style={{ fontSize: 22, fontWeight: "800", color: colors.colors.primary }}>{value}</Text>
    </View>
  );
}

export default function AdminDashboard() {
  const { data: stats, loading: sLoad } = useStats();
  const { data: alerts, loading: aLoad } = useAlerts(true, 6000);
  const logout = useAuthStore((s) => s.logout);

  return (
    // 1. ใช้ Container หลักตัวเดียวพอ (padding: 16)
    <View style={{ flex: 1, padding: 16, gap: 16, backgroundColor: "#f9fafb" }}>
      
      {/* --- Header Section --- */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700" }}>แดชบอร์ดผู้ดูแล</Text>
        <Pressable
          onPress={logout}
          style={{
            paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
            backgroundColor: colors.colors.danger,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 12 }}>
            ออกจากระบบ
          </Text>
        </Pressable>
      </View>

      {/* --- KPI Stats Section --- */}
      {/* ไม่ต้องเปิด View ซ้อนอีกชั้นตรงนี้แล้ว วางต่อกันได้เลย */}
      
      {/* Row 1 */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard label="Active Trucks" value={sLoad ? "-" : stats.activeTrucks} />
        <StatCard label="Open Alerts" value={sLoad ? "-" : stats.alertsOpen} />
      </View>
      
      {/* Row 2 */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatCard label="Avg Cargo Temp (°C)" value={sLoad ? "-" : stats.avgCargoTempC} />
        <StatCard label="Today Orders" value={sLoad ? "-" : stats.todayOrders} />
      </View>

      {/* --- Recent Alerts Section (List) --- */}
      {/* ใส่ flex: 1 เพื่อให้ List ดันพื้นที่ที่เหลือจนเต็มหน้าจอ */}
      <View style={{ flex: 1, marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
          การแจ้งเตือนล่าสุด
        </Text>
        
        {aLoad ? (
          <Text style={{ color: "#6b7280" }}>กำลังโหลดข้อมูล...</Text>
        ) : (
          <FlatList
            data={alerts.slice(0, 8)}
            keyExtractor={(it) => it.id}
            // เพิ่ม paddingBottom เพื่อให้ scroll ดูตัวสุดท้ายได้ไม่ติดขอบจอ
            contentContainerStyle={{ gap: 8, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ 
                backgroundColor: "#fff", borderRadius: 12, padding: 12, 
                borderWidth: 1, borderColor: "#e5e7eb" 
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: "700" }}>{item.type}</Text>
                    <Text style={{ fontSize: 12, color: "#94a3b8" }}>{item.ts}</Text>
                </View>
                <Text style={{ color: "#ef4444", fontSize: 12, marginBottom: 4 }}>
                    ความรุนแรง: {item.severity}
                </Text>
                <Text style={{ color: "#6b7280" }}>{item.message}</Text>
              </View>
            )}
          />
        )}
      </View>

    </View> // <--- ปิด View หลัก (ที่เคยหายไป)
  );
}