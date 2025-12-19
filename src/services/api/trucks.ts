import { http } from "./http";
export type Truck = {
  id: string;
  name: string;
  plateNo: string;
  status: "IDLE" | "ENROUTE" | "OFFLINE" | "MAINT";
  lastSeenAt?: string;
  lastLat?: number;
  lastLng?: number;
  cargoTempC?: number;
};
export async function listTrucks() {
  return (await http.get("/trucks")).data as Truck[];
}
export async function getTruck(id: string) {
  return (await http.get(`/trucks/${id}`)).data as Truck;
}
