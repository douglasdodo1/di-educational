import { REGISTER_MUTATION } from "@/graphql/auth/registerMutation";
import { useMutation } from "@apollo/client/react";

export const useRegisterMutation = () => {
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  return { register, loading, error };
};
