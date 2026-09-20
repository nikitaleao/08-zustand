'use client';

export default function ErrorNotes({ error }: { error: Error }) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
