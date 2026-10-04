import "./RegisterForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "../../api/auth";
import { getCurrentUser } from "../../api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth";
import { useForm } from "react-hook-form";
import { User } from "../../api/users";

interface Props {
  onSuccess: (user: User) => void;
}

export const RegisterForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      const user = await getCurrentUser();
      onSuccess(user);
    },
  });

  return (
    <form className="register-form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>

      <h2 className="register-form__title">Регистрация</h2>

      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input {...register("username")} />
      </FormField>

      <FormField label="Email" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      <Button type="submit" isLoading={mutation.isPending}>
        Зарегистрироваться
      </Button>

      <p className="register-form__error">{mutation.error?.message || ''}</p>
    </form>
  );
};