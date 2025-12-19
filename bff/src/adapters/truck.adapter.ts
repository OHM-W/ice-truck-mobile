// shape ฝั่งแอป:
// export type Truck = {
//   id: string;
//   name: string;
//   plateNo: string;
//   status: "IDLE" | "ENROUTE" | "OFFLINE" | "MAINT";
//   lastSeenAt?: string;
//   lastLat?: number;
//   lastLng?: number;
//   cargoTempC?: number;
// };

import type { Truck } from "../types/truck";

type Raw = Record<string, any>;

export function mapToTruck(dto: Raw): Truck {
  return {
    id: String(dto.id ?? dto.truck_id ?? ""),
    name: String(dto.name ?? dto.alias ?? dto.license ?? "Truck"),
    plateNo: String(dto.plate ?? dto.license ?? "-"),
    status: mapStatus(dto.status),
    lastSeenAt: dto.updated_at ?? dto.last_seen_at ?? null,
    lastLat: num(dto.last_lat ?? dto.lat) ?? null,
    lastLng: num(dto.last_lng ?? dto.lng) ?? null,
    cargoTempC: num(dto.temp_c ?? dto.cargo_temp_c ?? dto.temp) ?? null,
  };
}

function mapStatus(s: any): "IDLE" | "ENROUTE" | "OFFLINE" | "MAINT" {
  const v = String(s ?? "").toUpperCase();
  if (["RUNNING", "ACTIVE", "ON", "ENROUTE"].includes(v)) return "ENROUTE";
  if (["IDLE", "STOP", "PARK"].includes(v)) return "IDLE";
  if (["MAINT", "SERVICE"].includes(v)) return "MAINT";
  if (["OFF", "OFFLINE"].includes(v)) return "OFFLINE";
  return "OFFLINE";
}

function num(v: any): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
