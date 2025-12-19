// src/services/api.ts
import { http } from "./http";
import { ENDPOINTS } from "./endpoints";
import { ENV } from "../config/env";

import { isHistoryItemDTO, isTruckDTO } from "../types/dto";
import type { TruckDTO, HistoryItemDTO } from "../types/dto";

import { toTruck, toHistoryItem } from "./adapters/truck";
import type { Truck, HistoryItem } from "../types/model";

import { getCache, setCache } from "./cache";

const TTL_MS = 30_000; // 30s

/* -------------------- Mock -------------------- */
async function mockDelay<T>(data: T, ms = 500): Promise<T> {
  await new Promise((r) => setTimeout(r, ms));
  return data;
}

const mockTrucks: TruckDTO[] = [
  { 
    id: "t01", 
    name: "Ice Truck #01", 
    plateNo: "1กข 1234",
    maxKg: 5000, 
    weightKg: 1500 
  },
  { 
    id: "t02", 
    name: "Ice Truck #02", 
    plateNo: "2กข 5678",
    maxKg: 4500, 
    weightKg: 2200 
  },
];

const mockHistory: HistoryItemDTO[] = [
  {
    id: "h01",
    truckId: "t01",
    timestamp: new Date().toISOString(),
    lat: 13.7563,
    lng: 100.5018,
    tempC: -18.5,
    title: "Live position",
    location: "Bangkok, TH",
    desc: "Lat 13.7563, Lng 100.5018",
    highlight: true,
  },
];

async function mockGetTrucks(): Promise<Truck[]> {
  const data = mockTrucks.filter(isTruckDTO).map(toTruck);
  return mockDelay(data);
}

async function mockGetTruckById(id: string): Promise<Truck> {
  const dto = mockTrucks.find((t) => t.id === id);
  if (!dto || !isTruckDTO(dto)) throw new Error("Not found");
  return mockDelay(toTruck(dto));
}

async function mockGetHistoryByTruck(id: string): Promise<HistoryItem[]> {
  const data = mockHistory
    .filter((h) => h.truckId === id && isHistoryItemDTO(h))
    .map(toHistoryItem);
  return mockDelay(data);
}

async function mockUpdateTruck(
  id: string,
  patch: Partial<Pick<Truck, "weightKg">>
): Promise<Truck> {
  const idx = mockTrucks.findIndex((t) => t.id === id);
  if (idx < 0) throw new Error("Not found");
  mockTrucks[idx] = { ...mockTrucks[idx], ...patch };
  return mockDelay(toTruck(mockTrucks[idx]));
}

/* -------------------- Real API -------------------- */
export async function getTrucks(): Promise<Truck[]> {
  const key = "cache:trucks";
  const cached = await getCache<Truck[]>(key);
  if (cached) return cached;

  if (ENV.MOCK_API) {
    const data = await mockGetTrucks();
    await setCache(key, data, TTL_MS);
    return data;
  }

  const listResp = await http.get<TruckDTO[]>(ENDPOINTS.trucks);
  const list = listResp.data;
  const data = list.filter(isTruckDTO).map(toTruck);
  await setCache(key, data, TTL_MS);
  return data;
}

export async function getTruckById(id: string): Promise<Truck> {
  if (ENV.MOCK_API) return mockGetTruckById(id);

  const dtoResp = await http.get<TruckDTO>(ENDPOINTS.truckById(id));
  const dto = dtoResp.data;
  if (!isTruckDTO(dto)) throw new Error("Invalid payload");
  return toTruck(dto);
}

export async function getHistoryByTruck(id: string): Promise<HistoryItem[]> {
  const key = `cache:history:${id}`;
  const cached = await getCache<HistoryItem[]>(key);
  if (cached) return cached;

  if (ENV.MOCK_API) {
    const data = await mockGetHistoryByTruck(id);
    await setCache(key, data, TTL_MS);
    return data;
  }

  const listResp = await http.get<HistoryItemDTO[]>(
    ENDPOINTS.historyByTruck(id)
  );
  const list = listResp.data;
  const data = list.filter(isHistoryItemDTO).map(toHistoryItem);
  await setCache(key, data, TTL_MS);
  return data;
}

export async function updateTruckLoad(
  id: string,
  weightKg: number
): Promise<Truck> {
  if (ENV.MOCK_API) return mockUpdateTruck(id, { weightKg });

  const dtoResp = await http.patch<TruckDTO>(ENDPOINTS.truckById(id), {
    weightKg,
  });
  const dto = dtoResp.data;
  if (!isTruckDTO(dto)) throw new Error("Invalid payload");
  return toTruck(dto);
}