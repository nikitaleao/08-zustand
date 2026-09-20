'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.previewContainer}>
        {isLoading && <p>Loading note details...</p>}
        {isError && (
          <div className={css.error}>Failed to load note details.</div>
        )}
        {note && (
          <>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.tag}>Tag: {note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              Created: {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
