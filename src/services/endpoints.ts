export const ENDPOINTS = {
  trucks: "/trucks",
  truckById: (id: string) => `/trucks/${id}`,
  historyByTruck: (truckId: string) => `/trucks/${truckId}/history`,
} as const;