import mermaid from "mermaid";
import { useEffect, useId, useState } from "react";
import "./MermaidDiagram.css";

interface MermaidDiagramProps {
  definition: string;
}

export default function MermaidDiagram({ definition }: MermaidDiagramProps) {
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    const theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "neutral";
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme });
    mermaid
      .render(diagramId, definition)
      .then(({ svg: renderedSvg }) => {
        if (isCurrent) setSvg(renderedSvg);
      })
      .catch(() => {
        if (isCurrent) setError("Le diagramme ne peut pas être affiché.");
      });
    return () => {
      isCurrent = false;
    };
  }, [definition, diagramId]);

  if (error)
    return <p className="mermaid-diagram mermaid-diagram--error">{error}</p>;
  return (
    <div
      className="mermaid-diagram"
      role="img"
      aria-label="Diagramme technique"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
