import { http } from "./http";

export type AlertItem = {
  id: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
  truckId?: string;
  ts: string;
  acknowledged?: boolean;
};

export async function listAlerts(params?: { open?: 1 | 0 }) {
  const { data } = await http.get("/alerts", { params });
  return data as AlertItem[];
}

export async function ackAlert(id: string) {
  const { data } = await http.patch(`/alerts/${id}/ack`);
  return data as { ok: true };
}
