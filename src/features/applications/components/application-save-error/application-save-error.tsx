import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplicationSaveError() {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex gap-3">
        <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div>
          <p className="font-semibold">Couldn&apos;t save your last change</p>
          <p className="text-sm text-muted-foreground">
            Your browser blocked local storage, so this change will be lost after a reload.
          </p>
        </div>
      </div>
      <Button variant="outline" className="self-end font-semibold sm:self-auto">
        Try again
      </Button>
    </div>
  );
}
