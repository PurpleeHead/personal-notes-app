import { NoteData } from "../schemas/note";

export interface Note {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: number;
}

export interface NotesResponse {
  list: Note[];
  pageCount: number;
}

const API_BASE = "http://localhost:4000";

export const getNotes = async (): Promise<NotesResponse> => {
  const response = await fetch(`${API_BASE}/notes`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Не удалось получить заметки");
  }

  return response.json();
};

export const createNote = async (data: NoteData): Promise<string> => {
  const response = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Не удалось создать заметку");
  }

  return response.text();
};