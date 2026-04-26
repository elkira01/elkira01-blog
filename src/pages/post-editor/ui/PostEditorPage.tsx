import { useMutation } from "@tanstack/react-query";
import {
	Bold,
	Code2,
	Heading1,
	Heading2,
	Italic,
	Link as LinkIcon,
	List,
	Quote,
	Settings,
	Smartphone,
	Type,
} from "lucide-react";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
import type { Post } from "@/entities/post";
import { createPost, updatePost } from "@/entities/post";
import { useAutosave } from "@/features/post-edit";
import { EditorPanel } from "@/widgets/markdown-editor";

type PostEditorPageProps = {
	post?: Post;
};

type PublishStatus = "draft" | "published";

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/--+/g, "-");
}

export function PostEditorPage({ post }: PostEditorPageProps) {
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

	const createMutation = useMutation({
		mutationFn: (opts: Parameters<typeof createPost>[0]) => createPost(opts),
	});

	const updateMutation = useMutation({
		mutationFn: (opts: Parameters<typeof updatePost>[0]) => updatePost(opts),
	});

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
					await updateMutation.mutateAsync({
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
					const created = await createMutation.mutateAsync({
						data: {
							title: trimmedTitle,
							slug: safeSlug,
							excerpt: resolvedExcerpt || undefined,
							contentMd: value,
							status: resolvedStatus,
						},
					});

					setCurrentPostId(created.id);
					window.history.replaceState(null, "", `/posts/${created.id}/edit`);
				}

				setSlug(safeSlug);
				setStatus(resolvedStatus);
				setSavedAt(new Date());
			} catch {
				setSaveError("Autosave failed. Please keep editing and retry.");
			}
		},
		[
			title,
			slug,
			excerpt,
			status,
			currentPostId,
			updateMutation,
			createMutation,
		],
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

	const isSaving = updateMutation.isPending || createMutation.isPending;

	const saveStateLabel = useMemo(() => {
		if (isSaving) {
			return "Saving changes…";
		}
		if (savedAt) {
			return `Last saved at ${savedAt.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			})}`;
		}
		return currentPostId ? "Draft loaded" : "New draft";
	}, [isSaving, savedAt, currentPostId]);

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

	return (
		<div className="engineer-workspace">
			<header className="engineer-topbar">
				<div className="mx-auto flex w-full max-w-[1760px] items-center gap-2 px-4 py-3 sm:px-6">
					<p className="engineer-font-serif text-[2rem] leading-none font-semibold tracking-tight">
						THE ENGINEER
					</p>
					<span className="engineer-panel-title hidden md:inline">
						/ DRAFTING
					</span>

					<div className="ml-auto hidden items-center gap-2 text-sm text-[var(--engineer-muted)] lg:flex">
						<span>{saveStateLabel}</span>
						<span className="engineer-status-pill rounded-sm px-2 py-1 text-[0.62rem]">
							{publicationLabel}
						</span>
					</div>

					<button
						type="button"
						onClick={() => void handleSaveDraft()}
						className="engineer-action-button ml-auto rounded px-3 py-2 lg:ml-3"
						disabled={isSaving}
					>
						Save Draft
					</button>
					<button
						type="button"
						onClick={() => void handlePublish()}
						className="engineer-action-button is-primary rounded px-3 py-2"
						disabled={isSaving}
					>
						Publish
					</button>
					<button
						type="button"
						className="engineer-toolbar-button px-2"
						title="Editor Settings"
					>
						<Settings className="h-4 w-4" />
					</button>
				</div>
			</header>

			<div className="mx-auto grid w-full max-w-[1760px] lg:min-h-[calc(100vh-65px)] lg:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="flex flex-col gap-8 border-b border-[var(--engineer-border)] px-5 py-6 lg:border-r lg:border-b-0 lg:px-6 lg:py-7">
					<section>
						<p className="engineer-panel-title mb-3 font-semibold">
							Formatting
						</p>
						<div className="grid grid-cols-4 gap-2">
							{formattingButtons.map((button) => (
								<button
									key={button.label}
									type="button"
									className="engineer-toolbar-button"
									title={`Insert ${button.label}`}
									onClick={() => insertSnippet(button.snippet)}
								>
									<button.icon className="h-3.5 w-3.5" />
								</button>
							))}
						</div>
					</section>

					<section className="space-y-4">
						<p className="engineer-panel-title font-semibold">Metadata</p>

						<div>
							<p className="engineer-input-label">Tags</p>
							<input
								type="text"
								value={tagsInput}
								onChange={(e) => setTagsInput(e.target.value)}
								placeholder="architecture, systems..."
								className="engineer-input"
							/>
						</div>

						<div>
							<p className="engineer-input-label">Slug</p>
							<input
								type="text"
								value={slug}
								onChange={handleSlugChange}
								placeholder="the-architecture-of-minimalist-code"
								className="engineer-input"
							/>
						</div>
					</section>

					<div className="engineer-note mt-auto p-4 text-sm text-[var(--engineer-muted)]">
						<p className="mb-2 flex items-center gap-1 font-semibold text-[var(--engineer-accent)] uppercase tracking-[0.08em]">
							<Type className="h-3.5 w-3.5" />
							Editor Note
						</p>
						<p className="m-0 leading-6">
							Keep paragraphs concise. Engineering broadsheets value clarity
							over verbosity.
						</p>
					</div>
				</aside>

				<section className="min-h-0 p-3 sm:p-4 lg:p-6">
					<div className="engineer-panel flex h-full min-h-[calc(100vh-8rem)] flex-col overflow-hidden">
						<div className="border-b border-[var(--engineer-border)] px-6 py-7 sm:px-12 sm:py-8">
							<div className="mb-4 flex items-center gap-2 text-xs text-[var(--engineer-muted)]">
								<span className="font-semibold tracking-[0.16em] text-[var(--engineer-accent)] uppercase">
									Technical Essay
								</span>
								<span>•</span>
								<span>Live Draft</span>
								<span className="ml-auto flex items-center gap-1">
									<Smartphone className="h-3.5 w-3.5" />
									Responsive
								</span>
							</div>

							<input
								type="text"
								value={title}
								onChange={handleTitleChange}
								placeholder="The Architecture of Minimalist Code"
								className="engineer-font-serif w-full border-0 bg-transparent text-5xl leading-[1.04] font-medium text-[var(--engineer-ink)] outline-none"
							/>

							<textarea
								value={excerpt}
								onChange={handleExcerptChange}
								placeholder="Why less abstraction often leads to more resilient systems."
								rows={2}
								className="engineer-font-serif mt-5 w-full resize-none border-0 bg-transparent text-4xl leading-[1.12] font-medium text-[var(--engineer-muted)] italic outline-none"
							/>

							{saveError ? (
								<p className="mt-3 text-sm text-[var(--engineer-accent)]">
									{saveError}
								</p>
							) : null}
						</div>

						<div className="min-h-0 flex-1">
							<EditorPanel
								value={contentMd}
								onChange={handleContentChange}
								title={title}
								excerpt={excerpt}
								className="h-full"
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
