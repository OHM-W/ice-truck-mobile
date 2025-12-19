import { useEffect, useState } from "react";
import { listAlerts, type AlertItem } from "@src/services/api/alerts";

export function useAlerts(openOnly = true, pollMs = 5000) {
  const [data, setData] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await listAlerts(openOnly ? { open: 1 } : undefined);
        if (alive) { setData(res); setErr(null); }
      } catch (e: any) {
        if (alive) setErr(e?.message ?? "load alerts failed");
      } finally { if (alive) setLoading(false); }
    };
    load();
    const t = setInterval(load, pollMs);
    return () => { alive = false; clearInterval(t); };
  }, [openOnly, pollMs]);

  return { data, loading, error };
}
