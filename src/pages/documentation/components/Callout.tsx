import {
  Checkmark,
  Error,
  Idea,
  Information,
  WarningAlt,
} from "@carbon/icons-react";
import type { ReactNode } from "react";
import "./Callout.css";

type CalloutKind = "info" | "warning" | "success" | "danger" | "tip" | "note";

interface CalloutProps {
  children: ReactNode;
  kind: CalloutKind;
}

const calloutLabels: Record<CalloutKind, string> = {
  info: "Information",
  warning: "Attention",
  success: "Succès",
  danger: "Erreur",
  tip: "Conseil",
  note: "Remarque",
};

const calloutIcons = {
  info: Information,
  warning: WarningAlt,
  success: Checkmark,
  danger: Error,
  tip: Idea,
  note: Information,
};

export default function Callout({ children, kind }: CalloutProps) {
  const Icon = calloutIcons[kind];

  return (
    <aside
      className={`callout callout--${kind}`}
      aria-label={calloutLabels[kind]}
    >
      <span className="callout__symbol" aria-hidden="true">
        <Icon size={20} />
      </span>
      <div className="callout__body">
        <strong className="callout__title">{calloutLabels[kind]}</strong>
        {children}
      </div>
    </aside>
  );
}
