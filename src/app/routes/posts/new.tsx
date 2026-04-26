import { createFileRoute } from '@tanstack/react-router'
import { PostEditorPage } from '@/pages/post-editor'

export const Route = createFileRoute('/posts/new')({
  component: () => <PostEditorPage />,
})
