import { Checkmark, Copy } from "@carbon/icons-react";
import JavaPrism from "prismjs";
import "prismjs/components/prism-java";
import { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { createTextId } from "../../../utils/markdown";
import "./CodeBlock.css";

interface CodeBlockProps {
  code: string;
  languageName: string;
}

function getLanguage(languageName: string): Language {
  switch (languageName) {
    case "cpp":
      return "cpp";
    case "java":
      return "java";
    case "javascript":
      return "javascript";
    case "js":
      return "javascript";
    case "typescript":
      return "typescript";
    case "ts":
      return "typescript";
    case "tsx":
      return "tsx";
    case "css":
      return "css";
    case "bash":
      return "bash";
    case "json":
      return "json";
    default:
      return "markup";
  }
}

export default function CodeBlock({ code, languageName }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  return (
    <div className="code-block">
      <div className="code-block__toolbar">
        <span>{languageName || "code"}</span>
        <button type="button" onClick={copyCode} aria-live="polite">
          {isCopied ? (
            <Checkmark size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {isCopied ? "Copié" : "Copier"}
        </button>
      </div>
      <Highlight
        prism={languageName === "java" ? JavaPrism : undefined}
        theme={themes.vsDark}
        code={code}
        language={getLanguage(languageName)}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} code-block__pre`}
            style={style}
            tabIndex={0}
          >
            {tokens.map((line, lineIndex) => (
              <div
                key={createTextId(
                  `${lineIndex}-${line.map((token) => token.content).join("")}`,
                )}
                {...getLineProps({ line })}
              >
                {line.map((token, tokenIndex) => (
                  <span
                    key={createTextId(`${tokenIndex}-${token.content}`)}
                    {...getTokenProps({ token })}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
