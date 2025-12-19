import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getTruck, type Truck } from "@src/services/api/trucks";
import { connectRealtime, onRealtime } from "@src/services/ws/realtime";
import TruckSVG from "@assets/truck.svg";

type TelemetryMsg = {
  type: "telemetry";
  truckId: string;
  lat: number;
  lng: number;
  cargoTempC?: number;
  speedKmh?: number;
  ts: string;
};

export default function AdminTruckDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [temp, setTemp] = useState<number | undefined>(undefined);
  const [speed, setSpeed] = useState<number | undefined>(undefined);
  const [ts, setTs] = useState<string | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    getTruck(id!)
      .then((t) => alive && setTruck(t))
      .catch(() => {});
    connectRealtime();
    const off = onRealtime((m: TelemetryMsg) => {
      if (m?.type === "telemetry" && m.truckId === id) {
        setTemp(m.cargoTempC);
        setSpeed(m.speedKmh);
        setTs(m.ts);
      }
    });
    return () => {
      alive = false;
      off();
    };
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>รายละเอียดรถ</Text>
      {truck ? (
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 16,
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <TruckSVG width={220} height={110} />
          <Text style={{ fontWeight: "700", marginTop: 8 }}>
            {truck.name} • {truck.plateNo}
          </Text>
          <Text style={{ color: "#6b7280" }}>สถานะ: {truck.status}</Text>
          <Text style={{ color: "#6b7280" }}>
            ตำแหน่งล่าสุด: {truck.lastLat ?? "-"}, {truck.lastLng ?? "-"}
          </Text>
          <Text style={{ color: "#2563eb", fontWeight: "700", marginTop: 6 }}>
            อุณหภูมิสัมภาระ: {temp ?? truck.cargoTempC ?? "-"} °C
          </Text>
          <Text style={{ color: "#6b7280" }}>
            ความเร็ว: {speed ?? "-"} km/h
          </Text>
          <Text style={{ color: "#94a3b8" }}>
            อัปเดตล่าสุด: {ts ?? truck.lastSeenAt ?? "-"}
          </Text>
        </View>
      ) : (
        <Text>กำลังโหลดรายละเอียด...</Text>
      )}
    </View>
  );
}
