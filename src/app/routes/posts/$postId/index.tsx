import { createFileRoute } from '@tanstack/react-router'
import { PostReadPage } from '@/pages/post-read'

export const Route = createFileRoute('/posts/$postId/')({
  component: () => <PostReadPage />,
})
