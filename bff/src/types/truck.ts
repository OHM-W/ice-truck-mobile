export type Truck = {
  id: string;
  name: string;
  plateNo: string;
  status: "IDLE" | "ENROUTE" | "OFFLINE" | "MAINT";
  lastSeenAt: string | null;
  lastLat: number | null;
  lastLng: number | null;
  cargoTempC: number | null;
};