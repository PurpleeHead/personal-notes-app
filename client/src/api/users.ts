export interface User {
  id: string;
  email: string;
  username: string;
}

const API_BASE = "http://localhost:4000";

export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE}/users/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Не удалось получить данные пользователя");
  }

  return response.json();
};
