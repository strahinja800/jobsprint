# JobSprint

A small app for tracking job applications: company, position, posting link, status and next step.

## Important

- **Your data stays in your browser.** Everything is saved in `localStorage`. There is no account, no server and no sync between devices. Clearing browser data deletes your applications.
- **The planned "Application prep" panel uses mock questions.** It is not an AI model and does not analyze your posting.
- All job postings in seed data and tests are fictional.

## Features

- Add and edit applications with validation (required fields, URL must start with `https://`)
- Status tracking: saved, applied, interview, offer, rejected
- Search by company or position, filter by status, reset filters
- Data persists across reloads, and stored data is validated before it is used

## Planned

- JSON export and validated import with a preview before replacing data
- "Application prep" panel with mock questions

## Tech stack

Next.js · TypeScript · Tailwind CSS · shadcn/ui · React Hook Form · Zod · Playwright

## Getting started

```bash
nvm use
npm install
npm run dev
```

## Checks

```bash
npm run typecheck                    # TypeScript
npm run lint                         # ESLint
npm run test                         # unit + E2E (desktop and mobile)
npm run test -- --project=unit       # unit tests only
```

## Roadmap

- Authentication and a real database
- Real AI prep through a server API with structured output, access control and rate limits
