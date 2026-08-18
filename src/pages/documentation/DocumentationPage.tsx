import type { DocumentEntry } from "../../data/documents";
import { extractHeadings } from "../../utils/markdown";
import MarkdownDocument from "./components/MarkdownDocument";
import TableOfContents from "./components/TableOfContents";
import "./DocumentationPage.css";

interface DocumentationPageProps {
  document: DocumentEntry;
}

export default function DocumentationPage({
  document,
}: DocumentationPageProps) {
  const headings = extractHeadings(document.source);
  return (
    <>
      <main className="documentation-page" id="main-content" tabIndex={-1}>
        <nav
          className="documentation-page__breadcrumb"
          aria-label="Fil d’Ariane"
        >
          {document.categories.map((category) => (
            <span key={category.id}>
              {category.landingDocumentId ? (
                <a href={`#/docs/${category.landingDocumentId}`}>
                  {category.title}
                </a>
              ) : (
                category.title
              )}
              <span
                className="documentation-page__breadcrumb-separator"
                aria-hidden="true"
              >
                /
              </span>
            </span>
          ))}
          <span aria-current="page">{document.shortTitle}</span>
        </nav>
        <MarkdownDocument source={document.source} />
      </main>
      <TableOfContents headings={headings} />
    </>
  );
}
