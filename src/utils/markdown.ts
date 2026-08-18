export interface DocumentHeading {
  id: string;
  level: number;
  label: string;
}

export interface MarkdownSegment {
  kind: "markdown" | "info" | "warning" | "success" | "danger" | "tip" | "note";
  content: string;
}

function getDirectiveKind(value: string): MarkdownSegment["kind"] {
  switch (value) {
    case "info":
      return "info";
    case "warning":
      return "warning";
    case "success":
      return "success";
    case "danger":
      return "danger";
    case "tip":
      return "tip";
    case "note":
      return "note";
    default:
      return "note";
  }
}

export function removeFrontmatter(source: string): string {
  return source.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

export function prepareMarkdownSource(source: string): string {
  const lines = source.split("\n");
  const firstSecondLevelHeading = lines.findIndex((line) =>
    /^##\s+/.test(line),
  );
  let isCodeFenceOpen = false;

  return lines
    .map((line, index) => {
      if (/^```/.test(line)) {
        isCodeFenceOpen = !isCodeFenceOpen;
        return line;
      }
      if (isCodeFenceOpen) return line;

      const normalizedTerminology = line.replace(/\bCPP\b/g, "C++");
      const isLeadingThirdLevelHeading =
        /^###\s+/.test(normalizedTerminology) &&
        (firstSecondLevelHeading === -1 || index < firstSecondLevelHeading);
      return isLeadingThirdLevelHeading
        ? normalizedTerminology.replace(/^###\s+/, "## ")
        : normalizedTerminology;
    })
    .join("\n");
}

export function createHeadingId(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createTextId(value: string): string {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash).toString(36);
}

export function extractHeadings(source: string): readonly DocumentHeading[] {
  return removeFrontmatter(source)
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => ({
      id: createHeadingId(match[2]),
      level: match[1].length,
      label: match[2].replace(/[*_`]/g, ""),
    }));
}

export function splitMarkdown(source: string): readonly MarkdownSegment[] {
  const content = removeFrontmatter(source);
  const segments: MarkdownSegment[] = [];
  const directive =
    /^:::(info|warning|success|danger|tip|note)\s*\n([\s\S]*?)\n:::/gm;
  let cursor = 0;
  let match = directive.exec(content);

  while (match) {
    if (match.index > cursor) {
      segments.push({
        kind: "markdown",
        content: content.slice(cursor, match.index),
      });
    }
    segments.push({ kind: getDirectiveKind(match[1]), content: match[2] });
    cursor = match.index + match[0].length;
    match = directive.exec(content);
  }

  if (cursor < content.length) {
    segments.push({ kind: "markdown", content: content.slice(cursor) });
  }
  return segments;
}
