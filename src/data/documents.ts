import { prepareMarkdownSource } from "../utils/markdown";

interface Frontmatter {
  slug?: string;
  title?: string;
  sidebarLabel?: string;
  sidebarPosition?: number;
}

interface CategoryConfiguration {
  label?: string;
  position?: number;
}

export interface DocumentCategory {
  id: string;
  title: string;
  landingDocumentId?: string;
}

export interface DocumentEntry {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  categoryId: string;
  categories: readonly DocumentCategory[];
  position: number;
  isCategoryLanding: boolean;
  showInSidebar: boolean;
  source: string;
}

export interface DocumentGroup {
  id: string;
  title: string;
  position: number;
  documents: readonly DocumentEntry[];
  children: readonly DocumentGroup[];
}

const markdownModules = import.meta.glob<string>("../docs/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const categoryModules = import.meta.glob<CategoryConfiguration>(
  "../docs/**/_category.json",
  {
    eager: true,
    import: "default",
  },
);

function parseFrontmatter(source: string): Frontmatter {
  const block = source.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!block) return {};

  const metadata: Frontmatter = {};
  for (const line of block.split("\n")) {
    const entry = line.match(/^([a-zA-Z0-9_-]+):\s*(.*?)\s*$/);
    if (!entry) continue;
    const value = entry[2].replace(/^['"]|['"]$/g, "");
    if (entry[1] === "slug") metadata.slug = value;
    if (entry[1] === "title") metadata.title = value;
    if (entry[1] === "sidebar_label") metadata.sidebarLabel = value;
    if (entry[1] === "sidebar_position")
      metadata.sidebarPosition = Number(value);
  }
  return metadata;
}

function getCategoryId(filePath: string): string {
  return filePath.replace(/^.*\/docs\//, "").replace(/\/_category\.json$/, "");
}

const categoryConfigurations = new Map(
  Object.entries(categoryModules).map(([filePath, configuration]) => [
    getCategoryId(filePath),
    configuration,
  ]),
);

function createCategoryTitle(categoryId: string): string {
  const configuredLabel = categoryConfigurations.get(categoryId)?.label;
  if (configuredLabel) return configuredLabel;

  const directoryName = categoryId.split("/").at(-1) ?? categoryId;
  return directoryName
    .split("-")
    .map((word) => word.charAt(0).toLocaleUpperCase("fr") + word.slice(1))
    .join(" ");
}

function createCategoryPath(categoryId: string): readonly DocumentCategory[] {
  if (categoryId === "root") return [];
  const segments = categoryId.split("/");
  return segments.map((_, index) => {
    const id = segments.slice(0, index + 1).join("/");
    return {
      id,
      title: createCategoryTitle(id),
    };
  });
}

function createPosition(
  fileName: string,
  title: string,
  frontmatterPosition?: number,
): number {
  if (frontmatterPosition !== undefined && Number.isFinite(frontmatterPosition))
    return frontmatterPosition;
  if (fileName === "preambule") return -100;
  return Number(title.match(/^(\d+)/)?.[1] ?? 100);
}

function createDocumentId(relativePath: string, slug?: string): string {
  if (!slug) return relativePath.replaceAll("/", "-");
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
  return normalizedSlug
    ? normalizedSlug.replaceAll("/", "-")
    : relativePath.replaceAll("/", "-");
}

function createDocument(filePath: string, source: string): DocumentEntry {
  const relativePath = filePath.replace(/^.*\/docs\//, "").replace(/\.md$/, "");
  const pathParts = relativePath.split("/");
  const fileName = pathParts.at(-1) ?? relativePath;
  const categoryId =
    pathParts.length > 1 ? pathParts.slice(0, -1).join("/") : "root";
  const renderedSource = prepareMarkdownSource(source);
  const metadata = parseFrontmatter(renderedSource);
  const markdownTitle = renderedSource.match(/^#\s+(.+)$/m)?.[1] ?? fileName;
  const title = metadata.title ?? markdownTitle;
  const categories = createCategoryPath(categoryId);

  return {
    id: createDocumentId(relativePath, metadata.slug),
    title,
    shortTitle: metadata.sidebarLabel ?? title,
    category: categories.at(-1)?.title ?? "Général",
    categoryId,
    categories,
    position: createPosition(fileName, title, metadata.sidebarPosition),
    isCategoryLanding: fileName === "preambule",
    showInSidebar: true,
    source: renderedSource,
  };
}

function sortDocuments(
  firstDocument: DocumentEntry,
  secondDocument: DocumentEntry,
): number {
  return (
    firstDocument.position - secondDocument.position ||
    firstDocument.title.localeCompare(secondDocument.title, "fr")
  );
}

function sortGroups(
  firstGroup: DocumentGroup,
  secondGroup: DocumentGroup,
): number {
  return (
    firstGroup.position - secondGroup.position ||
    firstGroup.title.localeCompare(secondGroup.title, "fr")
  );
}

const discoveredDocuments = Object.entries(markdownModules)
  .map(([filePath, source]) => createDocument(filePath, source))
  .sort(sortDocuments);

const categoryLandingDocuments = new Map(
  discoveredDocuments
    .filter((document) => document.isCategoryLanding)
    .map((document) => [document.categoryId, document.id]),
);

export const documents = discoveredDocuments.map((document) => ({
  ...document,
  categories: document.categories.map((category) => ({
    ...category,
    landingDocumentId: categoryLandingDocuments.get(category.id),
  })),
}));

export const rootDocuments = documents.filter(
  (document) => document.categoryId === "root" && document.showInSidebar,
);

const groupedDocuments = new Map<string, DocumentEntry[]>();
for (const document of documents.filter(
  (entry) => entry.categoryId !== "root",
)) {
  const group = groupedDocuments.get(document.categoryId) ?? [];
  group.push(document);
  groupedDocuments.set(document.categoryId, group);
}

const groupIds = new Set<string>([
  ...categoryConfigurations.keys(),
  ...groupedDocuments.keys(),
]);
for (const groupId of [...groupIds]) {
  const segments = groupId.split("/");
  for (let index = 1; index < segments.length; index += 1)
    groupIds.add(segments.slice(0, index).join("/"));
}

const groups = new Map<string, DocumentGroup>();
for (const id of groupIds) {
  groups.set(id, {
    id,
    title: createCategoryTitle(id),
    position: categoryConfigurations.get(id)?.position ?? 100,
    documents: (groupedDocuments.get(id) ?? []).sort(sortDocuments),
    children: [],
  });
}

for (const group of groups.values()) {
  const parentId = group.id.includes("/")
    ? group.id.slice(0, group.id.lastIndexOf("/"))
    : undefined;
  if (parentId) (groups.get(parentId)?.children as DocumentGroup[]).push(group);
}

for (const group of groups.values())
  (group.children as DocumentGroup[]).sort(sortGroups);

export const documentGroups: readonly DocumentGroup[] = [...groups.values()]
  .filter((group) => !group.id.includes("/"))
  .sort(sortGroups);

export function findDocument(id: string | undefined): DocumentEntry {
  return (
    documents.find((document) => document.id === id) ??
    documents.find((document) => document.id === "preambule") ??
    documents[0]
  );
}
