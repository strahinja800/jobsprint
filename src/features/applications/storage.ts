import { jobApplicationArraySchema, type JobApplication } from './schema'

export const APPLICATION_STORAGE_KEY = 'jobsprint:v1:applications'

export type LoadResult =
  | { ok: true; applications: JobApplication[] }
  | { ok: false; reason: 'unavailable' | 'invalid-json' | 'invalid-data' }

export function parseStoredApplications(raw: string | null): LoadResult {
  if (raw === null) {
    return { ok: true, applications: [] }
  }

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return { ok: false, reason: 'invalid-json' }
  }

  const result = jobApplicationArraySchema.safeParse(data)

  if (!result.success) {
    return { ok: false, reason: 'invalid-data' }
  }

  return { ok: true, applications: result.data }
}

export function loadApplications(): LoadResult {
  let raw: string | null
  try {
    raw = localStorage.getItem(APPLICATION_STORAGE_KEY)
  } catch {
    return { ok: false, reason: 'unavailable' }
  }
  const result = parseStoredApplications(raw)

  return result
}

export function saveApplications(applications: JobApplication[]): boolean {
  try {
    localStorage.setItem(APPLICATION_STORAGE_KEY, JSON.stringify(applications))

    return true
  } catch {
    return false
  }
}
