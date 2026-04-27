import { createFileRoute, notFound } from '@tanstack/react-router'
import { getPost } from '@/entities/post'
import { PostEditorPage } from '@/pages/post-editor'

export const Route = createFileRoute('/admin/posts/$postId/edit')({
  loader: async ({ params }) => {
    const postId = Number(params.postId)

    if (!Number.isFinite(postId)) {
      return { post: null }
    }

    const post = await getPost({ data: postId })

    return { post }
  },
  component: function AdminPostEditRoute() {
    const { post } = Route.useLoaderData()

    if (!post) {
      return notFound()
    }

    return <PostEditorPage post={post} />
  },
})
