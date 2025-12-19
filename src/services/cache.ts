const cache = new Map<string, { data: any; expires: number }>();

export function setCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, {
    data,
    expires: Date.now() + ttl,
  });
}

export function getCache<T>(key: string): T | undefined {
  const item = cache.get(key);
  if (!item) return undefined;
  if (Date.now() > item.expires) {
    cache.delete(key);
    return undefined;
  }
  return item.data as T;
}