import { cn } from "cn";
import { STATUS_LABELS, type ApplicationStatus } from "@/features/applications/statuses";

const STATUS_STYLES: Record<ApplicationStatus, { text: string; dot: string }> = {
  saved: { text: "text-status-saved", dot: "bg-status-saved" },
  applied: { text: "text-status-applied", dot: "bg-status-applied" },
  interview: { text: "text-status-interview", dot: "bg-status-interview" },
  offer: { text: "text-status-offer", dot: "bg-status-offer" },
  rejected: { text: "text-status-rejected", dot: "bg-status-rejected" },
};

type ApplicationListItemStatusProps = {
  status: ApplicationStatus;
  className?: string;
};

export function ApplicationListItemStatus({ status, className }: ApplicationListItemStatusProps) {
  const styles = STATUS_STYLES[status];

  return (
    <p className={cn("flex items-center gap-2 text-sm font-medium", styles.text, className)}>
      <span aria-hidden className={cn("size-2 shrink-0 rounded-full", styles.dot)} />
      {STATUS_LABELS[status]}
    </p>
  );
}
