import test, { expect } from '@playwright/test'
import { SEED_APPLICATIONS } from './seed-applications'
import { parseStoredApplications } from './storage'

const validApplication = SEED_APPLICATIONS[0]

test.describe('parseStoredApplications', () => {
  test('returns an empty list when nothing is stored', () => {
    expect(parseStoredApplications(null)).toEqual({
      ok: true,
      applications: [],
    })
  })

  test('accepts valid strored applications', () => {
    const raw = JSON.stringify(SEED_APPLICATIONS)

    expect(parseStoredApplications(raw)).toEqual({
      ok: true,
      applications: SEED_APPLICATIONS,
    })
  })

  test('rejects malformed JSON', () => {
    expect(parseStoredApplications('not json')).toEqual({
      ok: false,
      reason: 'invalid-json',
    })
  })

  test('rejects an object instead of an list', () => {
    const raw = JSON.stringify(validApplication)

    expect(parseStoredApplications(raw)).toEqual({
      ok: false,
      reason: 'invalid-data',
    })
  })

  test('rejects an application withaout an id', () => {
    const raw = JSON.stringify([{ ...validApplication, id: undefined }])

    expect(parseStoredApplications(raw)).toEqual({
      ok: false,
      reason: 'invalid-data',
    })
  })

  test('rejects an application with a non-https URL', () => {
    const raw = JSON.stringify([
      { ...validApplication, url: 'http://example.com/jobs/test' },
    ])

    expect(parseStoredApplications(raw)).toEqual({
      ok: false,
      reason: 'invalid-data',
    })
  })
})
