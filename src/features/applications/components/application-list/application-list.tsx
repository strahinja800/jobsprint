import { ApplicationListItem, type ApplicationListItemData } from "./application-list-item";

type ApplicationListProps = {
  applications: ApplicationListItemData[];
};

export function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <ul aria-label="Job applications" className="divide-y rounded-xl border bg-card shadow-xs">
      {applications.map((application) => (
        <ApplicationListItem key={application.id} application={application} />
      ))}
    </ul>
  );
}
