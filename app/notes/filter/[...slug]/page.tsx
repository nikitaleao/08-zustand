import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesFilterPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0] || 'all';
  const tag = rawTag === 'all' ? undefined : rawTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => fetchNotes('', 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
