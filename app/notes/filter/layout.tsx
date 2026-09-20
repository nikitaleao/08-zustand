import css from './FilterLayout.module.css';

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.content}>{children}</main>
    </div>
  );
}
