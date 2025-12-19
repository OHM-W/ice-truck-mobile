import { useRole } from "@src/hooks/useRole";

/** ตัวอย่าง guard ระดับหน้า (ถ้าต้องการใช้เพิ่มเติม) */
export function useAdminOnly() {
  const { isAdmin } = useRole();
  return { allow: isAdmin };
}
