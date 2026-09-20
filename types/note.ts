export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export type NewNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page?: number;
  perPage?: number;
}
