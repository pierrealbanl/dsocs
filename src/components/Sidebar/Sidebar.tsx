import { ChevronDown, Close } from "@carbon/icons-react";
import { useState, type CSSProperties } from "react";
import {
  documentGroups,
  rootDocuments,
  type DocumentEntry,
  type DocumentGroup,
} from "../../data/documents";
import { uiContent } from "../../data/uiContent";
import "./Sidebar.css";

interface SidebarProps {
  activeDocumentId: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (documentId: string) => void;
}

export default function Sidebar({
  activeDocumentId,
  isOpen,
  onClose,
  onNavigate,
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const leadingRootDocuments = rootDocuments.filter(
    (document) => document.id === "preambule",
  );
  const trailingRootDocuments = rootDocuments.filter(
    (document) => document.id !== "preambule",
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((currentGroups) => ({
      ...currentGroups,
      [groupId]: !currentGroups[groupId],
    }));
  };

  const renderRootDocument = (document: DocumentEntry) => (
    <button
      className={`sidebar__link sidebar__link--root ${activeDocumentId === document.id ? "sidebar__link--active" : ""}`}
      type="button"
      key={document.id}
      onClick={() => onNavigate(document.id)}
      aria-current={activeDocumentId === document.id ? "page" : undefined}
    >
      {document.shortTitle}
    </button>
  );

  const renderGroup = (group: DocumentGroup, depth = 0) => {
    const controlId = `sidebar-group-${group.id.replaceAll("/", "-")}`;
    const indentation = { "--sidebar-indent": `${depth}rem` } as CSSProperties;
    return (
      <section className="sidebar__group" key={group.id} style={indentation}>
        <h2>
          <button
            className="sidebar__group-toggle"
            type="button"
            onClick={() => toggleGroup(group.id)}
            aria-expanded={Boolean(expandedGroups[group.id])}
            aria-controls={controlId}
          >
            <span>{group.title}</span>
            <ChevronDown
              className="sidebar__chevron"
              size={16}
              aria-hidden="true"
            />
          </button>
        </h2>
        <div
          className="sidebar__group-links"
          id={controlId}
          hidden={!expandedGroups[group.id]}
        >
          {group.documents.map((document) => (
            <button
              className={`sidebar__link ${activeDocumentId === document.id ? "sidebar__link--active" : ""}`}
              type="button"
              key={document.id}
              onClick={() => onNavigate(document.id)}
              aria-current={
                activeDocumentId === document.id ? "page" : undefined
              }
            >
              {document.shortTitle}
            </button>
          ))}
          {group.children.map((childGroup) =>
            renderGroup(childGroup, depth + 1),
          )}
        </div>
      </section>
    );
  };

  return (
    <>
      {isOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          onClick={onClose}
          aria-label={uiContent.close}
        />
      )}
      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        aria-label="Navigation de la documentation"
      >
        <button
          className="sidebar__close"
          type="button"
          onClick={onClose}
          aria-label={uiContent.close}
        >
          <Close size={20} aria-hidden="true" />
        </button>
        <nav className="sidebar__navigation">
          {leadingRootDocuments.map(renderRootDocument)}
          {documentGroups.map((group) => renderGroup(group))}
          {trailingRootDocuments.map(renderRootDocument)}
        </nav>
      </aside>
    </>
  );
}
