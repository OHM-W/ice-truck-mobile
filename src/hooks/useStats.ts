import { useEffect, useState } from "react";
import { fetchStats, type Stats } from "@src/services/api/stats";

const fallback: Stats = { activeTrucks: 0, alertsOpen: 0, avgCargoTempC: 0, todayOrders: 0 };

export function useStats() {
  const [data, setData] = useState<Stats>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const s = await fetchStats();
        if (alive) setData(s);
      } catch (e: any) {
        if (alive) setErr(e?.message ?? "load stats failed");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { data, loading, error };
}
