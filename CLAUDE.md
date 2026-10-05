@AGENTS.md

# JobSprint

Small single-user app for tracking job applications: company, position, link, status and next step.
Weekly learning project focused on forms, filters and client state. Full day-by-day plan: [docs/PLAN.md](docs/PLAN.md) (local only, gitignored).

## Scope (MVP)

- Single user demo. No auth, no database. Data lives in `localStorage` only.
- Auth and a real database are the NEXT iteration. Do not add them now.
- "Application prep" panel uses MOCK questions. A real AI route (server API + structured output) is optional and must never be enabled on the public demo without access control and rate limits.
- Use fictional job postings only (seed data, screenshots, tests).

## Stack

- Next.js 16 (App Router) + TypeScript (`strict`)
- Tailwind CSS 4 + shadcn/ui (`base-nova` style, Base UI primitives, `cn` package)
- React Hook Form + Zod 4 (`@hookform/resolvers`)
- Playwright for ALL tests (no Vitest/Jest):
  - `unit` project: pure logic (`src/**/*.test.ts`), no browser, no `page` fixture
  - `desktop` and `mobile` projects: E2E specs in `e2e/`
- Package manager: npm, Node 22 (`.nvmrc`)

## Commands

```bash
npm run dev                          # dev server
npm run build                        # production build
npm run lint                         # ESLint
npm run typecheck                    # tsc --noEmit
npm run test                         # all Playwright projects (starts dev server)
npm run test -- --project=unit       # only pure logic tests
npm run test:ui                      # Playwright UI mode
```

Run `npm run typecheck` and `npm run test` before every commit.

## Architecture

```
src/
  app/                          # routes only, thin pages
  components/ui/                # shadcn/ui primitives (generated, do not hand-edit heavily)
  features/
    applications/
      schema.ts                 # Zod schemas, single source of truth for types
      storage.ts                # localStorage read/write with Zod validation + versioning
      use-applications.ts       # state hook (CRUD)
      filters.ts                # pure filter/search functions
      components/
        application-form/       # application-form.tsx, application-form-fields.tsx ...
        application-list/       # application-list.tsx, application-list-item.tsx, application-list-empty.tsx
        application-filters/
    import-export/              # JSON export, validated import with preview
    prep-panel/                 # mock questions + panel UI
  lib/                          # small generic helpers
e2e/                            # Playwright E2E specs (*.spec.ts)
```

Unit tests live next to the code they test (`schema.test.ts` beside `schema.ts`) and import `test`/`expect` from `@playwright/test`.

## Rules

- Types come from Zod: `type JobApplication = z.infer<typeof jobApplicationSchema>`. Never duplicate them by hand.
- Everything read from `localStorage` or an imported file is untrusted. Always `safeParse` it, never cast.
- Storage key is versioned (`jobsprint:v1:applications`). A schema change means a new version plus a migration.
- Avoid hydration mismatch: read `localStorage` only on the client (effect or `useSyncExternalStore`), render a loading state first.
- Filtering and search logic are pure functions in `filters.ts` and are unit tested.
- Split components into feature folders with hierarchical names (`application-list/application-list-item.tsx`).
- Error messages shown to the user are clear and specific (e.g. "Enter a valid URL starting with https://").
- Every interactive element works with the keyboard and has an accessible label. Layout works at 360px width.
- No placeholder, speculative or commented-out code.

## Definition of done

- Add and edit work, filters work, data survives a reload.
- Invalid URL shows a clear error.
- At least one E2E flow (add → filter → edit) and schema validation tests pass.
- README states that data is local only and the mock AI is not a model.
