"use client";

import { useState } from "react";
import { ApplicationsView } from "@/features/applications/components/applications-view/applications-view";
import { DesignPreviewBar, type PreviewState } from "./design-preview-bar";
import { SAMPLE_APPLICATIONS } from "./sample-applications";

export function DesignPreview() {
  const [state, setState] = useState<PreviewState>("data");
  const hasNoApplications = state === "empty" || state === "no-results";

  return (
    <>
      <ApplicationsView
        key={state}
        applications={hasNoApplications ? [] : SAMPLE_APPLICATIONS}
        isFiltered={state === "no-results"}
        hasSaveError={state === "save-error"}
        defaultQuery={state === "no-results" ? "Acme" : undefined}
      />
      <DesignPreviewBar value={state} onChange={setState} />
    </>
  );
}
