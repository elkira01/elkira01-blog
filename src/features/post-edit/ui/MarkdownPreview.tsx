import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownPreviewProps = {
	source: string;
	className?: string;
};

export function MarkdownPreview({ source, className }: MarkdownPreviewProps) {
	return (
		<div className={className}>
			<Markdown remarkPlugins={[remarkGfm]}>{source}</Markdown>
		</div>
	);
}
