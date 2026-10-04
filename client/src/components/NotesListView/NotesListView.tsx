import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../api/notes";

export const NotesListView = () => {
  const { data, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (error) return <p>{error.message}</p>;

  if (data && data.list.length > 0) {
    return (
      <ul className="note-list-view">
        {data.list.map((note) => (
          <li key={note.id}>
            <NoteView note={note} />
          </li>
        ))}
      </ul>
    );
  }

  return null;
};