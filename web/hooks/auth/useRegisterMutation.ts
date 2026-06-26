import { REGISTER_MUTATION } from "@/graphql/auth/registerMutation";
import { RegisterResponse } from "@/types/register/registerResponse";
import { useMutation } from "@apollo/client/react";

export const useRegisterMutation = () => {
  const [register, { loading, error }] = useMutation<RegisterResponse>(REGISTER_MUTATION);
  return { register, loading, error };
};
