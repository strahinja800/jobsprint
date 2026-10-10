import { ExternalLink } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import type { JobApplication } from '@/features/applications/schema'
import { formatRelativeDate } from '@/lib/format-relative-date'
import { ApplicationListItemStatus } from './application-list-item-status'

type ApplicationListItemProps = {
  application: JobApplication
  onEdit: (application: JobApplication) => void
}

export function ApplicationListItem({
  application,
  onEdit,
}: ApplicationListItemProps) {
  const { company, position, status, nextStep, updatedAt, url } = application

  return (
    <li className='grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-4 md:grid-cols-[7.5rem_minmax(0,1.3fr)_minmax(0,1fr)_6rem_auto] md:gap-y-0 md:py-3.5'>
      <ApplicationListItemStatus
        status={status}
        className='order-1'
      />

      <p className='order-2 text-right text-sm text-muted-foreground md:order-4'>
        <time dateTime={updatedAt}>{formatRelativeDate(updatedAt)}</time>
      </p>

      <div className='order-3 col-span-2 min-w-0 md:order-2 md:col-span-1'>
        <p className='truncate font-semibold'>{company}</p>
        <p className='truncate text-sm text-muted-foreground'>{position}</p>
      </div>

      <p className='order-4 col-span-2 text-sm text-foreground/80 md:order-3 md:col-span-1'>
        {nextStep}
      </p>

      <div className='order-5 col-span-2 flex items-center justify-end gap-1 md:col-span-1'>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Open ${company} job posting in a new tab`}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <ExternalLink aria-hidden />
        </a>
        <Button
          onClick={() => onEdit(application)}
          variant='outline'
          aria-label={`Edit ${company} application`}
          className='font-semibold'
        >
          Edit
        </Button>
      </div>
    </li>
  )
}
