'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const safeNotes = Array.isArray(notes) ? notes : [];

  if (safeNotes.length === 0) {
    return <p className={css.empty}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.item}>
          <div className={css.header}>
            <h3 className={css.title}>{note.title}</h3>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>

            <button
              onClick={() => deleteMutation.mutate(note.id)}
              className={css.deleteBtn}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
