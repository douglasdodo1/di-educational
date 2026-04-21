import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useRegisterForm } from "./useRegisterForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RegisterForm = () => {
  const form = useRegisterForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col"
    >
      <div className="flex-1 min-h-0 max-h-[40vh] overflow-y-auto pr-2 flex flex-col gap-4">
        <FieldGroup>
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel className="text-base font-medium text-gray-700">Email</FieldLabel>
                <Input
                  className="py-5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="email"
                  placeholder="digite seu email"
                />
                {field.state.meta.isTouched && <FieldError>{field.state.meta.errors[0]?.message}</FieldError>}
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        <FieldGroup>
          <form.Field name="firstName">
            {(field) => (
              <Field>
                <FieldLabel className=" text-base font-medium text-gray-700">Nome</FieldLabel>
                <Input
                  className="py-5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="text"
                  placeholder="digite seu primeiro nome"
                />
                {field.state.meta.isTouched && <FieldError>{field.state.meta.errors[0]?.message}</FieldError>}
              </Field>
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <Field>
                <FieldLabel className=" text-base font-medium text-gray-700">Sobrenome</FieldLabel>
                <Input
                  className="py-5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="text"
                  placeholder="digite seu sobrenome"
                />
                {field.state.meta.isTouched && <FieldError>{field.state.meta.errors[0]?.message}</FieldError>}
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        <FieldGroup>
          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel className="text-base font-medium text-gray-700">Senha</FieldLabel>
                <Input
                  className="py-5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="password"
                  placeholder="digite sua senha"
                />
                {field.state.meta.isTouched && <FieldError>{field.state.meta.errors[0]?.message}</FieldError>}
              </Field>
            )}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel className="text-base font-medium text-gray-700">Confirmar Senha</FieldLabel>
                <Input
                  className="py-5"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  type="password"
                  placeholder="confirme sua senha"
                />
                {field.state.meta.isTouched && <FieldError>{field.state.meta.errors[0]?.message}</FieldError>}
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </div>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting} className="mt-8 h-12 w-full bg-[#f05b05]">
            Cadastrar
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
