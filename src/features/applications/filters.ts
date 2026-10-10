import z from 'zod'
import { applicationStatusSchema, JobApplication } from './schema'

export const statusFilterSchema = z.union([
  z.literal('all'),
  applicationStatusSchema,
])

export type StatusFilter = z.infer<typeof statusFilterSchema>

export type ApplicationFilterValues = {
  query: string
  status: StatusFilter
}

export const DEFAULT_FILTERS: ApplicationFilterValues = {
  query: '',
  status: 'all',
}

export function hasActiveFilters({ query, status }: ApplicationFilterValues) {
  return query.trim() !== '' || status !== 'all'
}

export function filterApplications(
  applications: JobApplication[],
  { query, status }: ApplicationFilterValues,
) {
  const normalizedQuery = query.trim().toLocaleLowerCase()

  return applications.filter(application => {
    const matchesStatus = status === 'all' || application.status === status
    const matchesQuery =
      normalizedQuery === '' ||
      application.company.toLocaleLowerCase().includes(normalizedQuery) ||
      application.position.toLocaleLowerCase().includes(normalizedQuery)

    return matchesStatus && matchesQuery
  })
}
