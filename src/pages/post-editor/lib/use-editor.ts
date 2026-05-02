import {
	Bold,
	Code2,
	Heading1,
	Heading2,
	Italic,
	Link as LinkIcon,
	List,
	Quote,
} from "lucide-react";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
import type { Post } from "@/entities/post";
import { useAutosave } from "@/features/post-edit";
import { usePostEditorController } from "./use-post-edit-controller";

type PublishStatus = "draft" | "published";

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/--+/g, "-");
}

export const useEditor = (post?: Post) => {
	const controller = usePostEditorController();

	const [currentPostId, setCurrentPostId] = useState<number | null>(
		post?.id ?? null,
	);

	const [title, setTitle] = useState(post?.title ?? "");
	const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
	const [slug, setSlug] = useState(post?.slug ?? "");
	const [isSlugEdited, setIsSlugEdited] = useState(Boolean(post?.slug));
	const [tagsInput, setTagsInput] = useState("");
	const [contentMd, setContentMd] = useState(post?.contentMd ?? "");
	const [savedAt, setSavedAt] = useState<Date | null>(null);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [status, setStatus] = useState<PublishStatus>(
		(post?.status as PublishStatus | undefined) ?? "draft",
	);

	const persistPost = useCallback(
		async (value: string, nextStatus?: PublishStatus) => {
			const trimmedTitle = title.trim();
			if (!trimmedTitle) {
				return;
			}
			const safeSlug = slug.trim() || slugify(trimmedTitle);
			const resolvedExcerpt = excerpt.trim();
			const resolvedStatus = nextStatus ?? status;

			try {
				setSaveError(null);

				if (currentPostId !== null) {
					await controller.onUpdatePost({
						data: {
							id: currentPostId,
							values: {
								title: trimmedTitle,
								slug: safeSlug,
								excerpt: resolvedExcerpt || undefined,
								contentMd: value,
								status: resolvedStatus,
							},
						},
					});
				} else {
					const created = await controller.onCreatePost({
						data: {
							title: trimmedTitle,
							slug: safeSlug,
							excerpt: resolvedExcerpt || undefined,
							contentMd: value,
							status: resolvedStatus,
						},
					});

					setCurrentPostId(created.id);
					window.history.replaceState(
						null,
						"",
						`/admin/posts/${created.id}/edit`,
					);
				}

				setSlug(safeSlug);
				setStatus(resolvedStatus);
				setSavedAt(new Date());
			} catch {
				setSaveError("Autosave failed. Please keep editing and retry.");
			}
		},
		[title, slug, excerpt, status, currentPostId],
	);

	const { trigger: triggerAutosave } = useAutosave<string>({
		onSave: persistPost,
		delay: 1500,
	});

	const handleContentChange = useCallback(
		(value: string) => {
			setContentMd(value);
			triggerAutosave(value);
		},
		[triggerAutosave],
	);

	const handleTitleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newTitle = e.target.value;
			setTitle(newTitle);
			if (!isSlugEdited) {
				setSlug(slugify(newTitle));
			}
			triggerAutosave(contentMd);
		},
		[triggerAutosave, contentMd, isSlugEdited],
	);

	const handleExcerptChange = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => {
			setExcerpt(e.target.value);
			triggerAutosave(contentMd);
		},
		[triggerAutosave, contentMd],
	);

	const handleSlugChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const nextSlug = e.target.value;
			setSlug(nextSlug);
			setIsSlugEdited(nextSlug.trim().length > 0);
			triggerAutosave(contentMd);
		},
		[triggerAutosave, contentMd],
	);

	const handleSaveDraft = useCallback(async () => {
		await persistPost(contentMd, "draft");
	}, [persistPost, contentMd]);

	const handlePublish = useCallback(async () => {
		await persistPost(contentMd, "published");
	}, [persistPost, contentMd]);

	const insertSnippet = useCallback(
		(snippet: string) => {
			setContentMd((previous) => {
				const nextValue =
					previous.trim().length > 0
						? `${previous.trimEnd()}\n\n${snippet}`
						: snippet;
				triggerAutosave(nextValue);
				return nextValue;
			});
		},
		[triggerAutosave],
	);

	const saveStateLabel = useMemo(() => {
		if (controller.isSaving) {
			return "Saving changes…";
		}
		if (savedAt) {
			return `Last saved at ${savedAt.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})}`;
		}
		return currentPostId ? "Draft loaded" : "New draft";
	}, [controller.isSaving, savedAt, currentPostId]);

	const publicationLabel = status === "published" ? "Published" : "Draft";

	const formattingButtons = useMemo(
		() => [
			{ label: "H1", icon: Heading1, snippet: "# Heading" },
			{ label: "H2", icon: Heading2, snippet: "## Section title" },
			{ label: "B", icon: Bold, snippet: "**bold text**" },
			{ label: "I", icon: Italic, snippet: "*italic text*" },
			{ label: "Quote", icon: Quote, snippet: "> Quote" },
			{ label: "Code", icon: Code2, snippet: "```ts\nconst value = true\n```" },
			{ label: "List", icon: List, snippet: "- First point\n- Second point" },
			{
				label: "Link",
				icon: LinkIcon,
				snippet: "[Link text](https://example.com)",
			},
		],
		[],
	);

	return {
		saveStateLabel,
		publicationLabel,
		isSaving: controller.isSaving,
		handlePublish,
		handleSaveDraft,
		formattingButtons,
		insertSnippet,
		tagsInput,
		handleTitleChange,
		handleExcerptChange,
		handleSlugChange,
		handleContentChange,
		contentMd,
		title,
		excerpt,
		slug,
		saveError,
		setTagsInput,
	};
};
