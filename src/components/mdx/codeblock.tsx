import { ScrollArea } from "@base-ui/react/scroll-area";
import vitesseDark from "@shikijs/themes/vitesse-dark";
import vitesseLight from "@shikijs/themes/vitesse-light";
import { transformerNotationHighlight, transformerNotationDiff } from "@shikijs/transformers";
import { createHighlighter, createOnigurumaEngine } from "shiki";

const highlighter = await createHighlighter({
  langs: ["python", "typescript", "markdown", "rust", "zig"],
  themes: ["vitesse-dark"],
  engine: createOnigurumaEngine(import("shiki/wasm")),
});

export function CodeBlock(props: { code: string; lang: string }) {
  const html = highlighter.codeToHtml(props.code, {
    lang: props.lang,
    themes: {
      light: vitesseLight,
      dark: vitesseDark,
    },
    transformers: [transformerNotationDiff(), transformerNotationHighlight()],
  });
  return (
    <ScrollArea.Root className={"rounded-lg border border-card bg-l1"}>
      <ScrollArea.Viewport>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="horizontal"
        className={
          "pointer-events-none m-2 flex h-1 items-center rounded-sm opacity-0 transition-opacity data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0"
        }
      >
        <ScrollArea.Thumb className={"h-full w-fit rounded-full bg-muted"} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
