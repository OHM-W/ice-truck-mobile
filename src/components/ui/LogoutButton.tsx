import { AppButton } from "./AppButton";
import { useAuthStore } from "@src/store/auth.store";

export function LogoutButton() {
  const { logout } = useAuthStore();
  return <AppButton title="Logout" onPress={logout} />;
}
