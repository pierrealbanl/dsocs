import { lazy, Suspense, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  createHeadingId,
  createTextId,
  splitMarkdown,
} from "../../../utils/markdown";
import Callout from "./Callout";
import "./MarkdownDocument.css";

const CodeBlock = lazy(() => import("./CodeBlock"));
const MermaidDiagram = lazy(() => import("./MermaidDiagram"));

const cleanCodeOfficialUrl =
  "https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000009044/9780132350884";

function createSafeHref(href: string | undefined): string | undefined {
  if (
    href?.startsWith(
      "http://repo.aassfxxx.infos.st/docs/Coder%20Proprement.pdf",
    )
  )
    return cleanCodeOfficialUrl;
  return href;
}

interface MarkdownDocumentProps {
  source: string;
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 id={createHeadingId(String(children))}>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 id={createHeadingId(String(children))}>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 id={createHeadingId(String(children))}>{children}</h3>
  ),
  a: ({ children, href }) => (
    <a
      href={createSafeHref(href)}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  pre: ({ children }) => <>{children}</>,
  code: ({ children, className }) => {
    const languageName = className?.replace("language-", "") ?? "";
    const code = String(children).replace(/\n$/, "");
    return languageName === "mermaid" ? (
      <Suspense
        fallback={
          <pre className="markdown-document__code-loading">
            Chargement du diagramme…
          </pre>
        }
      >
        <MermaidDiagram definition={code} />
      </Suspense>
    ) : className ? (
      <Suspense
        fallback={
          <pre className="markdown-document__code-loading">
            <code>{code}</code>
          </pre>
        }
      >
        <CodeBlock code={code} languageName={languageName} />
      </Suspense>
    ) : (
      <code>{children}</code>
    );
  },
};

function renderMarkdown(content: string): ReactNode {
  const preparedContent = content.replace(
    /```([a-zA-Z0-9-]+)\s+title="([^"]+)"/g,
    "**$2**\n\n```$1",
  );
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {preparedContent}
    </ReactMarkdown>
  );
}

export default function MarkdownDocument({ source }: MarkdownDocumentProps) {
  return (
    <div className="markdown-document">
      {splitMarkdown(source).map((segment, index) =>
        segment.kind === "markdown" ? (
          <div key={createTextId(`${index}-${segment.content}`)}>
            {renderMarkdown(segment.content)}
          </div>
        ) : (
          <Callout
            key={createTextId(`${index}-${segment.content}`)}
            kind={segment.kind}
          >
            {renderMarkdown(segment.content)}
          </Callout>
        ),
      )}
    </div>
  );
}
