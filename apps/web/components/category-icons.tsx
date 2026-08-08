type IconProps = { className?: string };

const base = "size-5";

export function AiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" strokeLinecap="round" />
    </svg>
  );
}

export function WritingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20l3.5-1 10-10a2 2 0 0 0-3-3l-10 10L3.5 20 4 20Z" strokeLinejoin="round" />
      <path d="M13 5l3 3" strokeLinecap="round" />
    </svg>
  );
}

export function CalculatorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" strokeLinecap="round" />
      <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function TextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
    </svg>
  );
}

export function DevIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13.5 5 10.5 19" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" strokeLinejoin="round" />
    </svg>
  );
}

export function QrIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM14 20h3M20 14v3M20 20v.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RandomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8h.01M16 16h.01M12 12h.01M8 16h.01M16 8h.01" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

export function StudentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? base} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 8l10-4 10 4-10 4-10-4Z" strokeLinejoin="round" />
      <path d="M6 10.5V16c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5.5" strokeLinecap="round" />
      <path d="M22 8v6" strokeLinecap="round" />
    </svg>
  );
}
