import { useMutation } from "@tanstack/react-query";

import { createPost, updatePost } from "@/entities/post";

export const usePostEditorController = () => {
	const createMutation = useMutation({
		mutationFn: (opts: Parameters<typeof createPost>[0]) => createPost(opts),
	});

	const updateMutation = useMutation({
		mutationFn: (opts: Parameters<typeof updatePost>[0]) => updatePost(opts),
	});

	return {
		onCreatePost: createMutation.mutateAsync,
		onUpdatePost: updateMutation.mutateAsync,
		isSaving: createMutation.isPending || updateMutation.isPending,
	};
};
