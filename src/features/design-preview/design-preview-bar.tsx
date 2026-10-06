import { cn } from "cn";

export const PREVIEW_STATES = [
  { id: "data", label: "Sa podacima" },
  { id: "empty", label: "Prazna lista" },
  { id: "no-results", label: "Nema rezultata filtera" },
  { id: "save-error", label: "Greška pri čuvanju" },
] as const;

export type PreviewState = (typeof PREVIEW_STATES)[number]["id"];

type DesignPreviewBarProps = {
  value: PreviewState;
  onChange: (state: PreviewState) => void;
};

export function DesignPreviewBar({ value, onChange }: DesignPreviewBarProps) {
  return (
    <footer className="border-t border-dashed bg-muted">
      <div className="mx-auto flex w-full max-w-240 flex-wrap items-center gap-2 px-4 py-4 text-sm sm:px-6">
        <p id="design-preview-label" className="text-muted-foreground">
          Pregled stanja (samo za dizajn, nije deo prave aplikacije):
        </p>
        <div role="group" aria-labelledby="design-preview-label" className="flex flex-wrap gap-2">
          {PREVIEW_STATES.map((state) => (
            <button
              key={state.id}
              type="button"
              aria-pressed={value === state.id}
              onClick={() => onChange(state.id)}
              className={cn(
                "rounded-full border bg-background px-3 py-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                value === state.id && "border-foreground font-medium",
              )}
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
