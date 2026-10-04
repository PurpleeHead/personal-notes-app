import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(5, "Заголовок должен содержать не менее 5 символов"),
  text: z
    .string()
    .min(10, "Текст заметки должен содержать не менее 10 символов")
    .max(300, "Текст заметки не должен превышать 300 символов"),
});

export type NoteData = z.infer<typeof noteSchema>;
