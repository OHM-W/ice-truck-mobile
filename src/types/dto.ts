export interface TruckDTO {
  id: string;
  name: string;
  plateNo: string;
  maxKg: number;
  weightKg: number;
  status?: string;
  lastSeenAt?: string;
  lastLat?: number;
  lastLng?: number;
  cargoTempC?: number;
}

export interface HistoryItemDTO {
  id: string;
  truckId: string;
  timestamp: string;
  lat: number;
  lng: number;
  tempC: number;
  title?: string;
  location?: string;
  desc?: string;
  highlight?: boolean;
}

export function isTruckDTO(data: unknown): data is TruckDTO {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.name === "string" &&
    typeof d.plateNo === "string" &&
    typeof d.maxKg === "number" &&
    typeof d.weightKg === "number"
  );
}

export function isHistoryItemDTO(data: unknown): data is HistoryItemDTO {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.id === "string" &&
    typeof d.truckId === "string" &&
    typeof d.timestamp === "string" &&
    typeof d.lat === "number" &&
    typeof d.lng === "number" &&
    typeof d.tempC === "number"
  );
}