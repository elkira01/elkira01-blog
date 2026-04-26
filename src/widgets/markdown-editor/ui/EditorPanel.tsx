import { Eye, EyeOff, Pen } from "lucide-react";
import { useCallback, useState } from "react";
import { MarkdownEditor, MarkdownPreview } from "@/features/post-edit";

type EditorPanelProps = {
	value: string;
	onChange: (value: string) => void;
	title: string;
	excerpt: string;
	className?: string;
};

export function EditorPanel({
	value,
	onChange,
	title,
	excerpt,
	className,
}: EditorPanelProps) {
	const [showPreview, setShowPreview] = useState(true);
	const previewTitle = title.trim() || "Untitled Draft";
	const previewExcerpt =
		excerpt.trim() ||
		"Add an excerpt to frame the argument before the first section.";

	const togglePreview = useCallback(() => setShowPreview((v) => !v), []);

	return (
		<div className={`flex h-full min-h-0 flex-col ${className ?? ""}`}>
			<div className="flex items-center gap-2 border-b border-[var(--engineer-border)] px-4 py-3">
				<Pen className="h-4 w-4 text-[var(--engineer-muted)]" />
				<span className="engineer-panel-title font-semibold">
					Drafting Surface
				</span>

				<button
					type="button"
					onClick={togglePreview}
					className="engineer-toolbar-button ml-auto gap-1.5 px-3"
					title={showPreview ? "Hide preview" : "Show preview"}
				>
					{showPreview ? (
						<>
							<EyeOff className="h-3.5 w-3.5" />
							Hide Preview
						</>
					) : (
						<>
							<Eye className="h-3.5 w-3.5" />
							Show Preview
						</>
					)}
				</button>
			</div>

			<div className="engineer-split-shell grid min-h-0 flex-1 lg:grid-cols-[1fr_0.94fr]">
				<div className="min-h-[420px] lg:min-h-0 lg:border-r lg:border-[var(--engineer-border)]">
					<MarkdownEditor
						value={value}
						onChange={onChange}
						className="engineer-editor-cm h-full"
					/>
				</div>

				{showPreview ? (
					<section className="border-t border-[var(--engineer-border)] p-8 lg:border-t-0 lg:p-12">
						<div className="mb-6 flex items-center gap-3 text-xs text-[var(--engineer-muted)]">
							<span className="font-semibold tracking-[0.18em] text-[var(--engineer-accent)] uppercase">
								Technical Essay
							</span>
							<span>•</span>
							<span>Draft Preview</span>
						</div>

						<h1 className="engineer-font-serif mb-5 text-5xl leading-[1.03] font-medium text-[var(--engineer-ink)]">
							{previewTitle}
						</h1>
						<p className="engineer-font-serif mb-8 text-4xl leading-[1.08] font-medium text-[var(--engineer-muted)] italic">
							{previewExcerpt}
						</p>

						<hr className="mb-8 border-0 border-t border-[var(--engineer-border)]" />

						<MarkdownPreview
							source={value}
							className="engineer-preview-prose"
						/>
					</section>
				) : (
					<div className="hidden lg:block" />
				)}
			</div>
		</div>
	);
}
