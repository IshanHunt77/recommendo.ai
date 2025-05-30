// app/v1/comments/page.tsx
import CommentsSection from '@/components/CommentSection/page';
import { Suspense } from 'react';

export default function CommentsPage() {
  return (
    <Suspense fallback={<div>Loading comments...</div>}>
      <CommentsSection />
    </Suspense>
  );
}
