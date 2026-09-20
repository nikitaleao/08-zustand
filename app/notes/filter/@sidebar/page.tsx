import Link from 'next/link';
import css from './Sidebar.module.css';

const TAGS = ['all', 'Work', 'Personal', 'Shopping', 'Todo'];

export default function SidebarNotes() {
  return (
    <nav className={css.sidebar}>
      <ul className={css.tagList}>
        {TAGS.map(tag => (
          <li key={tag} className={css.tagItem}>
            <Link href={`/notes/filter/${tag}`} className={css.tagLink}>
              {tag === 'all' ? 'All Notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
