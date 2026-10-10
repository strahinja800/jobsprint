import { expect, test, type Page } from '@playwright/test'

type ApplicationInput = {
  company: string
  position: string
  url: string
  status: string
  nextStep: string
}

async function addApplication(page: Page, application: ApplicationInput) {
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Add application' })
    .click()

  const dialog = page.getByRole('dialog', { name: 'Add application' })
  await dialog.getByLabel('Company').fill(application.company)
  await dialog.getByLabel('Position').fill(application.position)
  await dialog.getByLabel('Job posting URL').fill(application.url)
  await dialog.getByLabel('Status').selectOption(application.status)
  await dialog.getByLabel('Next step').fill(application.nextStep)
  await dialog.getByRole('button', { name: 'Add application' }).click()

  await expect(dialog).toBeHidden()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('No applications yet')).toBeVisible()
})

test('adds, filters and edits applications, and keeps them after reload', async ({
  page,
}) => {
  const list = page.getByRole('list', { name: 'Job applications' })
  const items = list.getByRole('listitem')

  await addApplication(page, {
    company: 'Northwind Labs',
    position: 'Frontend Developer',
    url: 'https://example.com/jobs/northwind',
    status: 'applied',
    nextStep: 'Wait for recruiter reply',
  })
  await addApplication(page, {
    company: 'Bluefin Studio',
    position: 'React Engineer',
    url: 'https://example.com/jobs/bluefin',
    status: 'interview',
    nextStep: 'Prepare portfolio walkthrough',
  })
  await expect(items).toHaveCount(2)

  await page.reload()
  await expect(items).toHaveCount(2)

  const search = page.getByRole('searchbox', {
    name: 'Search company or position',
  })
  await search.fill('northwind')
  await expect(items).toHaveCount(1)
  await expect(items.first()).toContainText('Northwind Labs')

  await search.fill('')
  await page.getByLabel('Filter by status').selectOption('interview')
  await expect(items).toHaveCount(1)
  await expect(items.first()).toContainText('Bluefin Studio')

  await search.fill('northwind')
  await expect(
    page.getByText('No applications match your filters'),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Reset filters' }).click()
  await expect(items).toHaveCount(2)
  await expect(search).toHaveValue('')

  await page
    .getByRole('button', { name: 'Edit Bluefin Studio application' })
    .click()
  const editDialog = page.getByRole('dialog', { name: 'Edit application' })
  await expect(editDialog.getByLabel('Company')).toHaveValue('Bluefin Studio')
  await editDialog.getByLabel('Status').selectOption('offer')
  await editDialog.getByLabel('Next step').fill('Review contract details')
  await editDialog.getByRole('button', { name: 'Save changes' }).click()
  await expect(editDialog).toBeHidden()

  await expect(items).toHaveCount(2)
  const edited = items.filter({ hasText: 'Bluefin Studio' })
  await expect(edited).toContainText('Offer')
  await expect(edited).toContainText('Review contract details')

  await page.reload()
  await expect(items.filter({ hasText: 'Bluefin Studio' })).toContainText(
    'Review contract details',
  )
})

test('shows a clear error for a URL without https', async ({ page }) => {
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Add application' })
    .click()

  const dialog = page.getByRole('dialog', { name: 'Add application' })
  const url = dialog.getByLabel('Job posting URL')
  await url.fill('http://example.com/jobs/insecure')
  await dialog.getByRole('button', { name: 'Add application' }).click()

  await expect(dialog.getByText('URL must start with https://')).toBeVisible()
  await expect(url).toHaveAttribute('aria-invalid', 'true')
  await expect(dialog).toBeVisible()
})
