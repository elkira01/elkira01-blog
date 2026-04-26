import { useState, useCallback } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { MarkdownEditor, MarkdownPreview } from "@/features/post-edit";
import { Eye, EyeOff, Pen } from "lucide-react";

type EditorPanelProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function EditorPanel({ value, onChange, className }: EditorPanelProps) {
  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = useCallback(() => setShowPreview((v) => !v), []);

  return (
    <div className={`flex h-full flex-col ${className ?? ""}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5">
        <Pen className="h-4 w-4 text-[var(--sea-ink-soft)]" />
        <span className="text-sm font-medium text-[var(--sea-ink)]">Editor</span>

        <button
          type="button"
          onClick={togglePreview}
          className="ml-auto flex items-center gap-1.5 rounded-md border border-[var(--chip-line)] bg-white/50 px-2.5 py-1 text-xs font-medium text-[var(--sea-ink)] transition hover:bg-white/80 dark:bg-[rgba(255,255,255,0.06)] dark:hover:bg-[rgba(255,255,255,0.12)]"
          title={showPreview ? "Hide preview" : "Show preview"}
        >
          {showPreview ? (
            <>
              <EyeOff className="h-3.5 w-3.5" /> Hide Preview
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" /> Show Preview
            </>
          )}
        </button>
      </div>

      {/* Panels */}
      {showPreview ? (
        <Group orientation="horizontal" className="flex-1">
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto">
              <MarkdownEditor
                value={value}
                onChange={onChange}
                className="h-full"
              />
            </div>
          </Panel>

          <Separator className="w-1.5 bg-[var(--chip-line)] transition hover:bg-[var(--lagoon-deep)]" />

          <Panel defaultSize={50} minSize={20}>
            <div className="h-full overflow-auto p-6">
              <MarkdownPreview
                source={value}
                className="prose prose-sm max-w-none dark:prose-invert"
              />
            </div>
          </Panel>
        </Group>
      ) : (
        <div className="flex-1 overflow-auto">
          <MarkdownEditor
            value={value}
            onChange={onChange}
            className="h-full"
          />
        </div>
      )}
    </div>
  );
}
