import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { getCurrentUser } from "../../api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import { useForm } from "react-hook-form";
import { User } from "../../api/users";
import noteSvg from "../../assets/note.svg";

interface Props {
  onSuccess: (user: User) => void;
}

export const LoginForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      const user = await getCurrentUser();
      onSuccess(user);
    },
  });

  return (
    <form className="login-form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <div className="login-form__logo">
        <img src={noteSvg} alt="Logo" />
      </div>

      <h2 className="login-form__title">Авторизация</h2>

      <FormField label="Почта" errorMessage={errors.email?.message}>
        <input {...register("email")} />
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      <Button type="submit" isLoading={mutation.isPending}>
        Войти
      </Button>

      <p className="login-form__error">{mutation.error?.message || ''}</p>
    </form>
  );
};