import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageTitle from '@/components/PageTitle'
import { MDXComponents } from '@/components/MDXComponents'
import { sortedBlogPost, coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import React from 'react'

const DEFAULT_LAYOUT = 'PostLayout'
export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({
      params: {
        slug: p.slug.split('/'),
      },
    })),
    fallback: false,
  }
}
export const getStaticProps = async ({ params }) => {
  const slug = params.slug.join('/')
  const sortedPosts = sortedBlogPost(allBlogs)
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === slug)
  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults)
  })
  return {
    props: {
      post,
      authorDetails,
      prev,
      next,
    },
  }
}
export default function BlogPostPage({ post, authorDetails, prev, next }) {
  React.useEffect(() => {
    const loadImageZoom = async () => {
      const imageZoom = await import('fast-image-zoom').then((mod) => mod.default)
      imageZoom({
        selector: `img[alt]:not([alt=""]):not([data-image-zoom-disabled])`,
      })
    }
    loadImageZoom()
  }, [])

  return (
    <>
      {'draft' in post && post.draft === true && process.env.APP_ROLE !== 'LOCAL' ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <MDXLayoutRenderer
          layout={post.layout || DEFAULT_LAYOUT}
          content={post}
          MDXComponents={MDXComponents}
          toc={post.toc}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      )}
    </>
  )
}
