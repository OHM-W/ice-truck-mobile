import { http } from "./http";

export type Stats = {
  activeTrucks: number;
  alertsOpen: number;
  avgCargoTempC: number;
  todayOrders: number;
};

export async function fetchStats(): Promise<Stats> {
  const { data } = await http.get("/stats");
  return data;
}
