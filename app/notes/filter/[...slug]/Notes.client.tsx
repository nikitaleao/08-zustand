'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { search, page, tag }],
    queryFn: () => fetchNotes(search, page, tag),
  });

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>
      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && <NoteList notes={data.notes} />}
    </div>
  );
}
