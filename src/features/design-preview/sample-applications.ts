import type { ApplicationListItemData } from "@/features/applications/components/application-list/application-list-item";

export const SAMPLE_APPLICATIONS: ApplicationListItemData[] = [
  {
    id: "northlane-labs",
    company: "Northlane Labs",
    position: "Frontend Developer",
    status: "interview",
    nextStep: "Prepare system design round",
    updatedLabel: "2 days ago",
    url: "https://example.com/jobs/northlane-labs",
  },
  {
    id: "vantree-studio",
    company: "Vantree Studio",
    position: "Junior React Developer",
    status: "applied",
    nextStep: "Wait for recruiter reply",
    updatedLabel: "5 days ago",
    url: "https://example.com/jobs/vantree-studio",
  },
  {
    id: "cedarworks",
    company: "Cedarworks",
    position: "Full-stack Engineer (CMS)",
    status: "saved",
    nextStep: "Tailor CV before applying",
    updatedLabel: "1 week ago",
    url: "https://example.com/jobs/cedarworks",
  },
  {
    id: "mira-health",
    company: "Mira Health",
    position: "Web Engineer Intern",
    status: "offer",
    nextStep: "Review contract details",
    updatedLabel: "Today",
    url: "https://example.com/jobs/mira-health",
  },
  {
    id: "driftwood-systems",
    company: "Driftwood Systems",
    position: "Frontend Engineer",
    status: "rejected",
    nextStep: "Ask for feedback",
    updatedLabel: "3 weeks ago",
    url: "https://example.com/jobs/driftwood-systems",
  },
];
