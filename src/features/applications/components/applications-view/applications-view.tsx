'use client'

import { ApplicationFilters } from '../application-filters/application-filters'
import { ApplicationList } from '../application-list/application-list'
import { ApplicationListEmpty } from '../application-list/application-list-empty'
import { ApplicationSaveError } from '../application-save-error/application-save-error'
import { ApplicationsHeader } from '../applications-header/applications-header'
import { useApplications } from '../../use-applications'
import { useState } from 'react'
import { ApplicationFormDialog } from '../application-form/application-form-dialog'
import { JobApplication } from '../../schema'

type ApplicationsViewProps = {
  isFiltered: boolean
  defaultQuery?: string
}

export function ApplicationsView({
  isFiltered,
  defaultQuery,
}: ApplicationsViewProps) {
  const {
    applications,
    isLoading,
    hasSaveError,
    addApplication,
    updateApplication,
  } = useApplications()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication>()

  function openAddForm() {
    setEditingApplication(undefined)
    setIsFormOpen(true)
  }

  function openEditForm(application: JobApplication) {
    setEditingApplication(application)
    setIsFormOpen(true)
  }

  return (
    <>
      <ApplicationsHeader onAdd={openAddForm} />
      <main className='mx-auto flex w-full max-w-240 flex-1 flex-col gap-4 px-4 py-6 sm:px-6'>
        <ApplicationFilters defaultQuery={defaultQuery} />
        {hasSaveError && <ApplicationSaveError />}
        {applications.length > 0 ? (
          <ApplicationList
            applications={applications}
            onEdit={openEditForm}
          />
        ) : (
          <ApplicationListEmpty
            variant={isFiltered ? 'no-results' : 'empty'}
            onAdd={openAddForm}
          />
        )}
      </main>
      <ApplicationFormDialog
        application={editingApplication}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={values => {
          if (editingApplication) {
            updateApplication(editingApplication.id, values)
          } else {
            addApplication(values)
          }
          setIsFormOpen(false)
        }}
      />
    </>
  )
}
