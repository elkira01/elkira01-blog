import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { EditorPanel } from "@/widgets/markdown-editor";
import { useAutosave } from "@/features/post-edit";
import { createPost, updatePost } from "@/entities/post";
import type { Post } from "@/entities/post";

type PostEditorPageProps = {
  post?: Post;
};

export function PostEditorPage({ post }: PostEditorPageProps) {
  const [currentPostId, setCurrentPostId] = useState<number | null>(post?.id ?? null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [contentMd, setContentMd] = useState(post?.contentMd ?? "");
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: (opts: Parameters<typeof createPost>[0]) => createPost(opts),
  });

  const updateMutation = useMutation({
    mutationFn: (opts: Parameters<typeof updatePost>[0]) => updatePost(opts),
  });

  const handleSave = useCallback(
    async (value: string) => {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        return;
      }

      const safeSlug = trimmedTitle
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      try {
        setSaveError(null);

        if (currentPostId !== null) {
          await updateMutation.mutateAsync({
            data: {
              id: currentPostId,
              values: {
                title: trimmedTitle,
                slug: safeSlug,
                contentMd: value,
              },
            },
          });
        } else {
          const created = await createMutation.mutateAsync({
            data: {
              title: trimmedTitle,
              slug: safeSlug,
              contentMd: value,
              status: "draft",
            },
          });

          setCurrentPostId(created.id);
          window.history.replaceState(null, "", `/posts/${created.id}/edit`);
        }

        setSavedAt(new Date());
      } catch {
        setSaveError("Autosave failed. Please keep editing and retry.");
      }
    },
    [title, currentPostId, updateMutation, createMutation],
  );

  const { trigger: triggerAutosave } = useAutosave<string>({
    onSave: handleSave,
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      triggerAutosave(contentMd);
    },
    [triggerAutosave, contentMd],
  );

  const isSaving = updateMutation.isPending || createMutation.isPending;
  const isEditing = currentPostId !== null;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      {/* Header bar */}
      <div className="flex items-center gap-3 border-b border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Post title…"
          className="flex-1 bg-transparent text-lg font-semibold text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] outline-none"
        />

        <span className="text-xs text-[var(--sea-ink-soft)]">
          {isSaving
            ? "Saving…"
            : savedAt
              ? `Saved ${savedAt.toLocaleTimeString()}`
              : isEditing
                ? "Editing"
                : "New draft"}
        </span>
      </div>

      {saveError ? (
        <p className="border-b border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
          {saveError}
        </p>
      ) : null}

      {/* Editor panel */}
      <div className="flex-1 overflow-hidden">
        <EditorPanel value={contentMd} onChange={handleContentChange} />
      </div>
    </div>
  );
}
