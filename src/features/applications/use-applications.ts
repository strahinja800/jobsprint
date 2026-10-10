'use client'

import { useSyncExternalStore } from 'react'
import { JobApplication, JobApplicationFormValues } from './schema'
import { loadApplications, LoadResult, saveApplications } from './storage'

let snapshot: LoadResult | null = null
let hasSaveError = false
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): LoadResult {
  if (snapshot === null) {
    snapshot = loadApplications()
  }
  return snapshot
}

function getServerSnapshot(): LoadResult | null {
  return null
}

function getSaveErrorSnapshot() {
  return hasSaveError
}

function getServerSaveErrorSnapshot() {
  return false
}

function commit(applications: JobApplication[]) {
  hasSaveError = !saveApplications(applications)
  snapshot = { ok: true, applications }
  listeners.forEach(listener => listener())
}

export function useApplications() {
  const result = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const saveError = useSyncExternalStore(
    subscribe,
    getSaveErrorSnapshot,
    getServerSaveErrorSnapshot,
  )

  function addApplication(values: JobApplicationFormValues) {
    const current = getSnapshot()
    if (!current.ok) return

    const now = new Date().toISOString()
    commit([
      ...current.applications,
      { ...values, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
    ])
  }

  function updateApplication(id: string, values: JobApplicationFormValues) {
    const current = getSnapshot()
    if (!current.ok) return

    commit(
      current.applications.map(app =>
        app.id === id
          ? { ...app, ...values, updatedAt: new Date().toISOString() }
          : app,
      ),
    )
  }

  return {
    isLoading: result === null,
    loadError: result && !result.ok ? result.reason : null,
    applications: result?.ok ? result.applications : [],
    hasSaveError: saveError,
    addApplication,
    updateApplication,
  }
}
