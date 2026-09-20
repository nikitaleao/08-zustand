import { Metadata } from 'next';
import Link from 'next/link';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'This page does not exist or has been moved.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'This page does not exist or has been moved.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found | NoteHub',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        This page does not exist or has been moved.
      </p>
      <Link href="/notes/filter/all" className={css.link}>
        Back to Notes
      </Link>
    </div>
  );
}
