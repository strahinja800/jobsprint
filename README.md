# JobSprint

A small app for tracking job applications: company, position, posting link, status and next step.

> **Status:** in progress. This README is completed on Day 7 (screenshots, demo link, test notes).

## Important

- **Your data stays in your browser.** Everything is saved in `localStorage`. There is no account, no server and no sync between devices. Clearing browser data deletes your applications, so use JSON export for backups.
- **The "Application prep" panel uses mock questions.** It is not an AI model and does not analyze your posting.
- All job postings in screenshots and seed data are fictional.

## Features (planned)

- Add and edit applications with validation (required fields, valid URL)
- Status tracking and filters (status + text search)
- Data persists across reloads
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

## Roadmap

- Authentication and a real database
- Real AI prep through a server API with structured output, access control and rate limits
