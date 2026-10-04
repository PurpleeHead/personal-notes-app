import { LoginData, RegisterData } from "../schemas/auth";

const API_BASE = "http://localhost:4000";

export const login = async (data: LoginData): Promise<void> => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Ошибка авторизации");
  }
};

export const register = async (data: RegisterData): Promise<void> => {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Ошибка регистрации");
  }
};

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Ошибка выхода");
  }
};