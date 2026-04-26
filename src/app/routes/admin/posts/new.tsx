import { createFileRoute } from '@tanstack/react-router'
import { PostEditorPage } from '@/pages/post-editor'

export const Route = createFileRoute('/admin/posts/new')({
  component: () => <PostEditorPage />,
})
