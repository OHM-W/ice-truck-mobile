import { useEffect, useState } from "react";
import { listTrucks, Truck } from "@src/services/api/trucks";
export function useTrucks(poll = 5000) {
  const [data, setData] = useState<Truck[]>([]),
    [loading, setL] = useState(true),
    [err, setE] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    const load = async () => {
      try {
        const r = await listTrucks();
        live && (setData(r), setE(null));
      } catch (e: any) {
        live && setE(e?.message || "load trucks failed");
      } finally {
        live && setL(false);
      }
    };
    load();
    const t = setInterval(load, poll);
    return () => {
      live = false;
      clearInterval(t);
    };
  }, [poll]);
  return { data, loading, error: err };
}
