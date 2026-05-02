import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";

type MarkdownEditorProps = Omit<ReactCodeMirrorProps, "extensions"> & {
	value: string;
	onChange: (value: string) => void;
};

export function MarkdownEditor({
	value,
	onChange,
	...rest
}: MarkdownEditorProps) {
	return (
		<CodeMirror
			value={value}
			onChange={onChange}
			extensions={[
				markdown({ base: markdownLanguage, codeLanguages: languages }),
			]}
			basicSetup={{
				lineNumbers: true,
				foldGutter: true,
				bracketMatching: true,
				autocompletion: true,
			}}
			{...rest}
		/>
	);
}
