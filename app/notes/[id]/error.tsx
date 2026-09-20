'use client';

export default function ErrorNoteDetails({ error }: { error: Error }) {
  return <p>Could not fetch note details. {error.message}</p>;
}
