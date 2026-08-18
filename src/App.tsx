import { useEffect, useState } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import SearchDialog from "./components/SearchDialog/SearchDialog";
import Sidebar from "./components/Sidebar/Sidebar";
import { findDocument } from "./data/documents";
import DocumentationPage from "./pages/documentation/DocumentationPage";
import "./App.css";

type Theme = "light" | "dark";

function getDocumentIdFromHash(): string | undefined {
  return window.location.hash.match(/^#\/docs\/([^/]+)/)?.[1];
}

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem("engineering-docs-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [activeDocument, setActiveDocument] = useState(() =>
    findDocument(getDocumentIdFromHash()),
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const updateDocumentFromHash = () => {
      setActiveDocument(findDocument(getDocumentIdFromHash()));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", updateDocumentFromHash);
    return () =>
      window.removeEventListener("hashchange", updateDocumentFromHash);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("engineering-docs-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = `${activeDocument.shortTitle} — Engineering Docs`;
  }, [activeDocument]);

  useEffect(() => {
    const openSearchWithShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", openSearchWithShortcut);
    return () => window.removeEventListener("keydown", openSearchWithShortcut);
  }, []);

  const navigateToDocument = (documentId: string) => {
    window.location.hash = `/docs/${documentId}`;
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <a className="app-shell__skip-link" href="#main-content">
        Aller au contenu principal
      </a>
      <AppHeader
        isDark={theme === "dark"}
        onOpenNavigation={() => setIsSidebarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <div className="app-shell__layout">
        <Sidebar
          activeDocumentId={activeDocument.id}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={navigateToDocument}
        />
        <DocumentationPage document={activeDocument} />
      </div>
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateToDocument}
      />
    </div>
  );
}
