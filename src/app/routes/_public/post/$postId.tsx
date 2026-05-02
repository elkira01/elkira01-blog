import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPost } from "@/entities/post";

export const Route = createFileRoute("/_public/post/$postId")({
	loader: async ({ params }) => {
		const postId = Number(params.postId);

		if (!Number.isFinite(postId)) {
			return { post: null };
		}

		const post = await getPost({ data: postId });

		return { post };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { post } = Route.useLoaderData();

	if (!post) {
		return notFound();
	}

	return <div>Hello "/_public/post/$postId"!</div>;
}
