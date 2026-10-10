import { BriefcaseBusiness, Plus, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

const EMPTY_CONTENT = {
  empty: {
    Icon: BriefcaseBusiness,
    title: 'No applications yet',
    description:
      'Add your first application to start tracking where it stands.',
  },
  'no-results': {
    Icon: SearchX,
    title: 'No applications match your filters',
    description: 'Try a different search term or status.',
  },
} as const

type Props = {
  variant: keyof typeof EMPTY_CONTENT
  onAction: () => void
}

export function ApplicationListEmpty({ variant, onAction }: Props) {
  const { Icon, title, description } = EMPTY_CONTENT[variant]

  return (
    <section className='flex flex-col items-center rounded-xl border bg-card px-6 py-14 text-center shadow-xs'>
      <span className='flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground'>
        <Icon
          aria-hidden
          className='size-5'
        />
      </span>
      <h2 className='mt-4 font-semibold'>{title}</h2>
      <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
        {description}
      </p>
      {variant === 'empty' ? (
        <Button
          onClick={onAction}
          size='lg'
          className='mt-5 px-4 font-semibold'
        >
          <Plus aria-hidden />
          Add application
        </Button>
      ) : (
        <Button
          onClick={onAction}
          variant='outline'
          size='lg'
          className='mt-5 px-4 font-semibold'
        >
          Reset filters
        </Button>
      )}
    </section>
  )
}
