import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { APPLICATION_STATUSES, STATUS_LABELS } from "@/features/applications/statuses";

type ApplicationFiltersProps = {
  defaultQuery?: string;
};

export function ApplicationFilters({ defaultQuery }: ApplicationFiltersProps) {
  return (
    <div role="search" className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <label htmlFor="application-search" className="sr-only">
          Search company or role
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          id="application-search"
          type="search"
          placeholder="Search company or role"
          defaultValue={defaultQuery}
          className="h-10 bg-background pl-9"
        />
      </div>

      <label htmlFor="application-status-filter" className="sr-only">
        Filter by status
      </label>
      <select
        id="application-status-filter"
        defaultValue="all"
        className="h-10 rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-40 md:text-sm"
      >
        <option value="all">All statuses</option>
        {APPLICATION_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </div>
  );
}
