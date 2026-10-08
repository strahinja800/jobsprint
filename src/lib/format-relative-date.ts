const DAY_MS = 24 * 60 * 60 * 1000;

const relativeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeDate(isoDate: string, now: Date = new Date()): string {
  const days = Math.round((new Date(isoDate).getTime() - now.getTime()) / DAY_MS);
  const label =
    Math.abs(days) < 7
      ? relativeFormat.format(days, "day")
      : relativeFormat.format(Math.round(days / 7), "week");

  return label.charAt(0).toUpperCase() + label.slice(1);
}
