import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, "Почта должна содержать не менее 5 символов"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный формат электронной почты"),
  username: z
    .string()
    .min(5, "Имя пользователя должно содержать не менее 5 символов"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
