import axios from 'axios';
import { Note, NewNote, FetchNotesResponse } from '@/types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (
  search: string = '',
  page: number = 1,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    search,
    page,
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
