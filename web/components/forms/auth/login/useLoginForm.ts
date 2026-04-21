import { useLoginMutation } from "@/hooks/auth/useLoginMutation";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
  const { login } = useLoginMutation();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await login({
            variables: {
              email: value.email,
              password: value.password,
            },
          });

          if (!response.data) return "Erro ao fazer login";

          const { user } = response.data.login;
          setUser(user);
          router.push("/home");
        } catch {
          return "Credenciais inválidas";
        }
      },
    },
  });

  return form;
};
