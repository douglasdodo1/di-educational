import { useLoginMutation } from "@/hooks/auth/useLoginMutation";
import { setTokens } from "@/lib/authCookies";
import { useAuthStore } from "@/stores/authStore";
import { useForm } from "@tanstack/react-form";

export const useLoginForm = () => {
  const { login } = useLoginMutation();
  const { setUser } = useAuthStore();

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

          const { access_token, refresh_token, user } = response.data.login;
          setTokens(access_token, refresh_token);
          setUser(user);

          return null;
        } catch {
          return "Credenciais inválidas";
        }
      },
    },
  });

  return form;
};
