'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type {
  JobApplication,
  JobApplicationFormValues,
} from '@/features/applications/schema'
import { ApplicationForm } from './application-form'

type ApplicationFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  application?: JobApplication
  onSubmit: (values: JobApplicationFormValues) => void
}

export function ApplicationFormDialog({
  open,
  onOpenChange,
  application,
  onSubmit,
}: ApplicationFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>
            {application ? 'Edit application' : 'Add application'}
          </DialogTitle>
          <DialogDescription>
            Track the role and what you need to do next.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm
          application={application}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
