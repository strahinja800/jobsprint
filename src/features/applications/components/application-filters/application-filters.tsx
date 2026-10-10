import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  APPLICATION_STATUSES,
  STATUS_LABELS,
} from '@/features/applications/statuses'
import { ApplicationFilterValues, statusFilterSchema } from '../../filters'
import { ChangeEvent } from 'react'

type ApplicationFiltersProps = {
  value: ApplicationFilterValues
  onChange: (value: ApplicationFilterValues) => void
}

export function ApplicationFilters({
  onChange,
  value,
}: ApplicationFiltersProps) {
  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const result = statusFilterSchema.safeParse(event.target.value)

    if (result.success) {
      onChange({ ...value, status: result.data })
    }
  }

  return (
    <div
      role='search'
      className='flex flex-col gap-3 sm:flex-row'
    >
      <div className='relative flex-1'>
        <label
          htmlFor='application-search'
          className='sr-only'
        >
          Search company or position
        </label>
        <Search
          aria-hidden
          className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground'
        />
        <Input
          id='application-search'
          type='search'
          placeholder='Search company or position'
          className='h-10 bg-background pl-9'
          value={value.query}
          onChange={event => onChange({ ...value, query: event.target.value })}
        />
      </div>

      <label
        htmlFor='application-status-filter'
        className='sr-only'
      >
        Filter by status
      </label>
      <select
        id='application-status-filter'
        className='h-10 rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-40 md:text-sm'
        value={value.status}
        onChange={handleStatusChange}
      >
        <option value='all'>All statuses</option>
        {APPLICATION_STATUSES.map(status => (
          <option
            key={status}
            value={status}
          >
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </div>
  )
}
