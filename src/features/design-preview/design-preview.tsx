'use client'

import { useState } from 'react'
import { ApplicationsView } from '@/features/applications/components/applications-view/applications-view'
import { DesignPreviewBar, type PreviewState } from './design-preview-bar'

export function DesignPreview() {
  const [state, setState] = useState<PreviewState>('data')

  return (
    <>
      <ApplicationsView
        key={state}
        isFiltered={state === 'no-results'}
        defaultQuery={state === 'no-results' ? 'Acme' : undefined}
      />
      <DesignPreviewBar
        value={state}
        onChange={setState}
      />
    </>
  )
}
