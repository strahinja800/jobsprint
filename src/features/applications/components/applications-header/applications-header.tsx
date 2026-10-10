import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  onAdd: () => void
}

export function ApplicationsHeader({ onAdd }: Props) {
  return (
    <>
      <header className='border-b bg-background'>
        <div className='mx-auto flex w-full max-w-240 items-center justify-between gap-4 px-4 py-5 sm:px-6'>
          <div className='min-w-0'>
            <h1 className='text-xl font-bold tracking-tight'>JobSprint</h1>
            <p className='text-sm text-muted-foreground'>
              Track where each application stands
            </p>
          </div>
          <Button
            onClick={onAdd}
            size='lg'
            className='h-10 px-4 font-semibold'
          >
            <Plus aria-hidden />
            Add application
          </Button>
        </div>
      </header>
    </>
  )
}
