'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
  });

  return (
    <div className={css.container}>
      <div className={css.topBar}>
        <SearchBox
          value={search}
          onChange={value => handleSearchChange(value)}
        />
        <button className={css.createBtn} onClick={() => setIsModalOpen(true)}>
          Create Note
        </button>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes!</p>}

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
