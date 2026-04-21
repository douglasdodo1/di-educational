import { LOGIN_MUTATION } from "@/graphql/auth/loginMutation";
import { AuthResponse } from "@/types/auth";
import { useMutation } from "@apollo/client/react";

export const useLoginMutation = () => {
  const [login, { loading, error }] = useMutation<AuthResponse>(LOGIN_MUTATION);

  return {
    login,
    loading,
    error,
  };
};
