'use client'

import { useEffect, useId, useState } from 'react'
import { useTheme } from 'next-themes'

/**
 * Renders a ```mermaid fence (converted to <Mermaid chart="..." /> by remarkMermaid in
 * contentlayer.config.ts). mermaid is imported on demand, so posts without a diagram never
 * download it, and the diagram re-renders when the site theme changes.
 */
const Mermaid = ({ chart }: { chart: string }) => {
  // mermaid uses the id as a CSS selector, so strip the colons React puts in useId()
  const id = `mermaid-${useId().replace(/[^\w-]/g, '')}`
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // next-themes only knows the theme after mount
    if (!resolvedTheme) return
    let cancelled = false

    import('mermaid')
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          look: 'handDrawn',
          handDrawnSeed: 1, // same sketch on every render instead of a new wobble per theme switch
        })
        const result = await mermaid.render(id, chart)
        if (!cancelled) setSvg(result.svg)
      })
      .catch((err) => {
        if (!cancelled) setError(String(err))
      })

    return () => {
      cancelled = true
    }
  }, [chart, id, resolvedTheme])

  if (error) {
    return <pre>{`Mermaid diagram failed to render:\n${error}\n\n${chart}`}</pre>
  }

  return (
    <div
      className="not-prose my-8 flex justify-center [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Mermaid
