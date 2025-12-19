import type { TruckDTO, HistoryItemDTO } from "../../types/dto";
import type { Truck, HistoryItem } from "../../types/model";

const STATUS_MAP = {
  RUNNING: "ENROUTE",
  ACTIVE: "ENROUTE",
  ON: "ENROUTE",
  ENROUTE: "ENROUTE",
  IDLE: "IDLE",
  STOP: "IDLE",
  PARK: "IDLE",
  MAINT: "MAINT",
  SERVICE: "MAINT",
  OFF: "OFFLINE",
  OFFLINE: "OFFLINE",
} as const;

export function toTruck(dto: TruckDTO): Truck {
  return {
    ...dto,
    status:
      dto.status && typeof dto.status === "string"
        ? STATUS_MAP[dto.status.toUpperCase() as keyof typeof STATUS_MAP] ?? "OFFLINE"
        : "OFFLINE",
  };
}

export function toHistoryItem(dto: HistoryItemDTO): HistoryItem {
  return {
    ...dto,
    timestamp: new Date(dto.timestamp),
  };
}