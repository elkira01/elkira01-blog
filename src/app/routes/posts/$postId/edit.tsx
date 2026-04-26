import { createFileRoute } from '@tanstack/react-router'
import { PostEditorPage } from '@/pages/post-editor'
import { getPost } from '@/entities/post'

export const Route = createFileRoute('/posts/$postId/edit')({
  loader: async ({ params }) => {
    const postId = Number(params.postId)

    if (!Number.isFinite(postId)) {
      return { post: null }
    }

    const post = await getPost({ data: postId })
    return { post };
  },
  component: function PostEditRoute() {
    const { post } = Route.useLoaderData();
    if (!post) return <div className="p-8 text-center text-[var(--sea-ink-soft)]">Post not found</div>;
    return <PostEditorPage post={post} />;
  },
})
