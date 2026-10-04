import "./NoteView.css";
import { Note } from "../../api/notes";

interface Props {
  note: Note;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};

export const NoteView = ({ note }: Props) => {
  return (
    <div className="note-view">
      <div className="note-view__head">
        <p className="note-view__datetime">{formatDate(note.createdAt)}</p>

        <p className="note-view__title">{note.title}</p>
      </div>
      <p className="note-view__text">{note.text}</p>
    </div>
  );
};