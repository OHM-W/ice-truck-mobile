let ws: WebSocket | null = null;
const subs = new Set<(m: any) => void>();
export function connectRealtime(
  u = process.env.EXPO_PUBLIC_WS_URL || "ws://localhost:3000/api/v1/telemetry"
) {
  if (ws) return ws;
  ws = new WebSocket(u as string);
  ws.onmessage = (e) => {
    try {
      const m = JSON.parse(e.data as any);
      subs.forEach((f) => f(m));
    } catch {}
  };
  ws.onclose = () => {
    ws = null;
  };
  return ws;
}
export function onRealtime(fn: (m: any) => void) {
  subs.add(fn);
  return () => subs.delete(fn);
}
