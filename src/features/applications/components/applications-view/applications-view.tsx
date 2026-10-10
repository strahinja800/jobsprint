'use client'

import { ApplicationFilters } from '../application-filters/application-filters'
import { ApplicationSaveError } from '../application-save-error/application-save-error'
import { ApplicationsHeader } from '../applications-header/applications-header'
import { useApplications } from '../../use-applications'
import { useState } from 'react'
import { ApplicationFormDialog } from '../application-form/application-form-dialog'
import { JobApplication } from '../../schema'
import { DEFAULT_FILTERS, filterApplications } from '../../filters'
import { ApplicationsViewContent } from './applications-view-content'

export function ApplicationsView() {
  const {
    applications,
    isLoading,
    hasSaveError,
    addApplication,
    updateApplication,
  } = useApplications()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication>()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const visibleApplications = filterApplications(applications, filters)

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
        <ApplicationFilters
          value={filters}
          onChange={setFilters}
        />
        {hasSaveError && <ApplicationSaveError />}
        <ApplicationsViewContent
          isLoading={isLoading}
          applications={applications}
          visibleApplications={visibleApplications}
          onAdd={openAddForm}
          onEdit={openEditForm}
          onResetFilters={() => setFilters(DEFAULT_FILTERS)}
        />
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
