// import { MDXLayoutRenderer } from '@/components/MDXComponents'

import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { MDXComponents } from '@/components/MDXComponents'
import Script from 'next/script'

const DEFAULT_LAYOUT = 'AuthorLayout'
export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return {
    props: {
      author,
    },
  }
}
export default function About({ author }) {
  return (
    <>
      <Script
        src="//cdn.credly.com/assets/utilities/embed.js"
        type="text/javascript"
        strategy="lazyOnload"
      />
      <MDXLayoutRenderer
        layout={author.layout || DEFAULT_LAYOUT}
        content={author}
        MDXComponents={MDXComponents}
      />
    </>
  )
}
