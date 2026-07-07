import { LOGOUT_MUTATION } from "@/graphql/auth/logoutMutation";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const [logoutMutation] = useMutation<{ logout: boolean }>(LOGOUT_MUTATION);
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  const logout = async () => {
    try {
      await logoutMutation();
    } catch {
      // Even if the mutation fails, clear local state
    }
    clearAuth();
    router.push("/login");
  };

  return { logout };
};
