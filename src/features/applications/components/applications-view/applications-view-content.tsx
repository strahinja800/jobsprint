import type { JobApplication } from '../../schema'
import { ApplicationList } from '../application-list/application-list'
import { ApplicationListEmpty } from '../application-list/application-list-empty'

type ApplicationsViewContentProps = {
  isLoading: boolean
  applications: JobApplication[]
  visibleApplications: JobApplication[]
  onAdd: () => void
  onEdit: (application: JobApplication) => void
  onResetFilters: () => void
}

export function ApplicationsViewContent({
  isLoading,
  applications,
  visibleApplications,
  onAdd,
  onEdit,
  onResetFilters,
}: ApplicationsViewContentProps) {
  if (isLoading) {
    return (
      <p
        role='status'
        className='text-sm text-muted-foreground'
      >
        Loading applications…
      </p>
    )
  }

  if (applications.length === 0) {
    return (
      <ApplicationListEmpty
        variant='empty'
        onAction={onAdd}
      />
    )
  }

  if (visibleApplications.length === 0) {
    return (
      <ApplicationListEmpty
        variant='no-results'
        onAction={onResetFilters}
      />
    )
  }

  return (
    <ApplicationList
      applications={visibleApplications}
      onEdit={onEdit}
    />
  )
}
