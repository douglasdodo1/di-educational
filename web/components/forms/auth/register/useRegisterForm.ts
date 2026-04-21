import { useRegisterMutation } from "@/hooks/auth/useRegisterMutation";
import { registerSchema } from "@/schemas/register-schema";
import { useForm } from "@tanstack/react-form";

export const useRegisterForm = () => {
  const { register, loading, error } = useRegisterMutation();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: registerSchema,
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await register({
          variables: {
            data: {
              first_name: value.firstName,
              last_name: value.lastName,
              email: value.email,
              password: value.password,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return form;
};
