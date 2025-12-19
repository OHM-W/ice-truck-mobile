import { http } from "./http";

export type Order = {
  id: string;
  code: string;
  customerName: string;
  status: "NEW" | "CONFIRMED" | "ENROUTE" | "DELIVERED" | "CANCELLED";
  assignedTruckId?: string;
  eta?: string;
};

export async function listOrders(params?: { status?: string }) {
  const { data } = await http.get("/orders", { params });
  return data as Order[];
}
