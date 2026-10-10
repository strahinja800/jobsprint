import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

type ApplicationFormFieldProps = {
  id: string
  label: string
  error?: string
  children: ReactNode
}

export function ApplicationFormField({
  id,
  label,
  error,
  children,
}: ApplicationFormFieldProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className='text-sm text-destructive'>
          {error}
        </p>
      )}
    </div>
  )
}
