import { useAuthStore } from "@src/store/auth.store";
export function useRole() {
  const role = useAuthStore((s)=>s.role);
  return { role, isAdmin: role === "admin", isClient: role === "client" };
}
