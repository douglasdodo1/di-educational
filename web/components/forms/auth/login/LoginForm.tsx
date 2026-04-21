import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "./useLoginForm";

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-12"
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Email</FieldLabel>
              <Input className="py-5" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            </Field>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Password</FieldLabel>
              <Input
                className="py-5"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.errorMap]}>
        {([errorMap]) => (errorMap.onSubmit ? <FieldError>{errorMap.onSubmit.toString()}</FieldError> : null)}
      </form.Subscribe>

      <Button className="w-full h-12 bg-[#f05b05]">Entrar</Button>
    </form>
  );
};
