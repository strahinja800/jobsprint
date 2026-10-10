'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  APPLICATION_STATUSES,
  jobApplicationFormSchema,
  type JobApplication,
  type JobApplicationFormValues,
} from '@/features/applications/schema'
import { STATUS_LABELS } from '@/features/applications/statuses'
import { ApplicationFormField } from './application-form-field'

type ApplicationFormProps = {
  application?: JobApplication
  onSubmit: (values: JobApplicationFormValues) => void
  onCancel: () => void
}

export function ApplicationForm({
  application,
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationFormSchema),
    defaultValues: {
      company: application?.company ?? '',
      position: application?.position ?? '',
      url: application?.url ?? '',
      status: application?.status ?? 'saved',
      nextStep: application?.nextStep ?? '',
    },
  })

  const fieldA11y = (id: string, hasError: boolean) => ({
    id,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? `${id}-error` : undefined,
  })

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <ApplicationFormField
        id='application-company'
        label='Company'
        error={errors.company?.message}
      >
        <Input
          {...fieldA11y('application-company', !!errors.company)}
          {...register('company')}
          className='h-10'
          autoComplete='organization'
        />
      </ApplicationFormField>

      <ApplicationFormField
        id='application-position'
        label='Position'
        error={errors.position?.message}
      >
        <Input
          {...fieldA11y('application-position', !!errors.position)}
          {...register('position')}
          className='h-10'
        />
      </ApplicationFormField>

      <ApplicationFormField
        id='application-url'
        label='Job posting URL'
        error={errors.url?.message}
      >
        <Input
          {...fieldA11y('application-url', !!errors.url)}
          {...register('url')}
          type='url'
          inputMode='url'
          placeholder='https://'
          className='h-10'
        />
      </ApplicationFormField>

      <ApplicationFormField
        id='application-status'
        label='Status'
        error={errors.status?.message}
      >
        <select
          {...fieldA11y('application-status', !!errors.status)}
          {...register('status')}
          className='h-10 rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm'
        >
          {APPLICATION_STATUSES.map(status => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </ApplicationFormField>

      <ApplicationFormField
        id='application-next-step'
        label='Next step'
        error={errors.nextStep?.message}
      >
        <Input
          {...fieldA11y('application-next-step', !!errors.nextStep)}
          {...register('nextStep')}
          className='h-10'
        />
      </ApplicationFormField>

      <div className='-mx-4 -mb-4 mt-2 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit' className='font-semibold'>
          {application ? 'Save changes' : 'Add application'}
        </Button>
      </div>
    </form>
  )
}
