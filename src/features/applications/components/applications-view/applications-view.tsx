import { ApplicationFilters } from "../application-filters/application-filters";
import { ApplicationList } from "../application-list/application-list";
import { ApplicationListEmpty } from "../application-list/application-list-empty";
import type { ApplicationListItemData } from "../application-list/application-list-item";
import { ApplicationSaveError } from "../application-save-error/application-save-error";
import { ApplicationsHeader } from "../applications-header/applications-header";

type ApplicationsViewProps = {
  applications: ApplicationListItemData[];
  isFiltered: boolean;
  hasSaveError: boolean;
  defaultQuery?: string;
};

export function ApplicationsView({
  applications,
  isFiltered,
  hasSaveError,
  defaultQuery,
}: ApplicationsViewProps) {
  return (
    <>
      <ApplicationsHeader />
      <main className="mx-auto flex w-full max-w-240 flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
        <ApplicationFilters defaultQuery={defaultQuery} />
        {hasSaveError && <ApplicationSaveError />}
        {applications.length > 0 ? (
          <ApplicationList applications={applications} />
        ) : (
          <ApplicationListEmpty variant={isFiltered ? "no-results" : "empty"} />
        )}
      </main>
    </>
  );
}
