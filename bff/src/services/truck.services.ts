import { xampp } from "./xamppClient";
import { mapToTruck } from "../adapters/truck.adapter";

export async function listTrucks({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const resp = await xampp.get("/trucks.php", { params: { page, limit } });
  const raw = Array.isArray(resp.data?.items)
    ? resp.data.items
    : Array.isArray(resp.data)
      ? resp.data
      : [];
  return raw.map(mapToTruck);
}

export async function getTruckById(id: string) {
  const resp = await xampp.get("/truck.php", { params: { id } });
  if (!resp.data) return null;
  return mapToTruck(resp.data);
}
