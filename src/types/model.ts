export type TruckStatus = "IDLE" | "ENROUTE" | "OFFLINE" | "MAINT";

export interface Truck {
  id: string;
  name: string;
  plateNo: string;
  maxKg: number;
  weightKg: number;
  status: TruckStatus;
  lastSeenAt?: string;
  lastLat?: number;
  lastLng?: number;
  cargoTempC?: number;
}

export interface HistoryItem {
  id: string;
  truckId: string;
  timestamp: Date;
  lat: number;
  lng: number;
  tempC: number;
  title?: string;
  location?: string;
  desc?: string;
  highlight?: boolean;
}