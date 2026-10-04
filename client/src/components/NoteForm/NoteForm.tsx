import "./NoteForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../../schemas/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../api/notes";

export const NoteForm = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      reset();
    },
  });

  return (
    <form className="note-form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
     
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input {...register("title")} placeholder="Введите заголовок" />
      </FormField>

      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea 
          {...register("text")} 
          placeholder="Введите текст заметки"
          rows={6}
        />
      </FormField>

      <Button type="submit" isLoading={mutation.isPending}>
        Сохранить
      </Button>

      <p className="note-form__error">{mutation.error?.message || ''}</p>
      <p className={`note-form__success ${mutation.isSuccess ? '' : 'note-form__error--hidden'}`}>
        {mutation.isSuccess ? 'Заметка создана!' : ''}
      </p>
    </form>
  );
};