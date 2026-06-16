# CLAUDE.md

Guidance for working in this repository.

## What this is

**Tech Appetite** (https://www.tech-appetite.com) — a personal tech blog focused on Sitecore and front-end topics. It is built on the **[Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)** template (v2.4.0). Content is authored as MDX files and compiled at build time by Contentlayer; there is no CMS or runtime database.

## Tech stack

- **Next.js 15.2** (App Router, React Server Components) + **React 19**
- **TypeScript 5** (path aliases via `tsconfig.json`: `@/components/*`, `@/data/*`, `@/layouts/*`, `@/css/*`)
- **Contentlayer2 0.5.8** (`next-contentlayer2`) — transforms MDX into a typed, generated content layer imported from `contentlayer/generated`
- **Tailwind CSS v4** (`@tailwindcss/postcss`, `@tailwindcss/typography`, `@tailwindcss/forms`) — config is CSS-first in `css/tailwind.css`, not a `tailwind.config.js`
- **pliny 0.4.1** — starter-blog utility library (MDX plugins, content helpers, analytics/newsletter/comments/search UI components)
- **next-themes** — light/dark/system theme switching
- **Yarn 3.6.1** (Berry, `.yarnrc.yml`) is the package manager — use `yarn`, not `npm`
- **Node 22.x** is the target runtime (pinned via `engines.node` in `package.json`; Vercel reads this). Floor is Node ≥ 18.18 (Next.js 15 requirement). Note: the dev container still uses `node:20`.
- Deployed on **Vercel** (see `.env.production`, `.devcontainer/`)

## Commands

```bash
yarn dev        # local dev server (sets APP_ROLE=LOCAL — drafts are visible)
yarn build      # APP_ROLE=PROD next build, then scripts/postbuild.mjs (RSS gen)
yarn serve      # serve production build
yarn lint       # eslint --fix across app, components, lib, layouts, scripts
yarn format     # prettier --write
yarn analyze    # build with bundle analyzer (ANALYZE=true)
```

Husky + lint-staged run eslint/prettier on commit.

## How blog content works (the core model)

### 1. Content lives in `data/` as MDX

- **Blog posts:** `data/blog/**/*.mdx` (organized into year folders `2019/`–`2025/`, ~28 posts). The `slug` computed field strips the leading `blog/` segment from `flattenedPath`, so `data/blog/2025/foo.mdx` → slug `2025/foo` → URL `/blog/2025/foo`. Year folders are kept in the URL.
- **Authors:** `data/authors/*.mdx` (e.g. `default.mdx`). Posts reference authors by filename slug via the `authors` frontmatter array.
- Files ending in `.disabled` (e.g. a `.mdx.disabled`) are ignored — a way to shelve a post without deleting it.

### 2. Contentlayer defines the schema (`contentlayer.config.ts`)

This is the heart of the data layer. It declares two document types:

- **`Blog`** — frontmatter fields: `title` (required), `date` (required), `tags[]`, `lastmod`, `draft`, `summary`, `images` (json), `authors[]`, `layout`, `bibliography`, `canonicalUrl`. Computed fields add `readingTime`, `slug`, `path`, `filePath`, `toc`, and `structuredData` (schema.org JSON-LD).
- **`Authors`** — `name` (required), `avatar`, `occupation`, `company`, `email`, social handles, `layout`.

The MDX pipeline configured here (remark/rehype plugins) provides: GFM, math (KaTeX), code titles + syntax highlighting (Prism), auto-linked headings, citations (`.bib`), image→JSX conversion, and GitHub-style alerts.

`onSuccess` generates two build artifacts:
- **`app/tag-data.json`** — counts of every tag (used to build the tags pages). Regenerated on build; do not edit by hand.
- **`public/search.json`** — the kbar local search index.

Running `yarn dev`/`yarn build` regenerates `.contentlayer/` and `contentlayer/generated`. Import content as `import { allBlogs, allAuthors } from 'contentlayer/generated'`.

### 3. Routes consume the generated content (`app/`)

App Router pages, all statically generated:

| Route | File | Notes |
|---|---|---|
| `/blog/[...slug]` | `app/blog/[...slug]/page.tsx` | **Single post page.** `generateStaticParams` maps `allBlogs`; picks a layout from frontmatter `layout`; renders MDX with `MDXLayoutRenderer`; builds JSON-LD, OG/Twitter metadata, prev/next nav. |
| `/blog` | `app/blog/page.tsx` | Post list, paginated (`POSTS_PER_PAGE = 5`), uses `ListLayoutWithTags`. |
| `/blog/page/[page]` | `app/blog/page/[page]/page.tsx` | Paginated list pages. |
| `/tags` | `app/tags/page.tsx` | All tags, from `tag-data.json`. |
| `/tags/[tag]` + `/tags/[tag]/page/[page]` | `app/tags/[tag]/...` | Posts filtered by tag (slugified). |
| `/` | `app/page.tsx` → `app/Main.tsx` | Home, latest posts. |
| `/about` | `app/about/page.tsx` | Renders the `Authors` doc with `AuthorLayout`. |
| `/projects` | `app/projects/page.tsx` | Driven by `data/projectsData.ts`. |

`sortPosts`, `allCoreContent`, `coreContent` (from `pliny/utils/contentlayer`) sort by date and strip heavy fields. **Drafts** (`draft: true`) are filtered out except when `APP_ROLE === 'LOCAL'` (i.e. `yarn dev`).

### 4. Post layouts (`layouts/`)

Set per-post via the `layout` frontmatter key (default `PostLayout`):

- **`PostLayout`** — default; sidebar with author, tags, prev/next, comments.
- **`PostSimple`** — minimal.
- **`PostBanner`** — large banner image at top (uses the first `images` entry).
- `ListLayout` / `ListLayoutWithTags` — for list/tag pages. `AuthorLayout` — about page.

### 5. MDX components

- **`components/MDXComponents.tsx`** registers what's usable inside MDX: `Image`, `TOCInline`, custom `a` (Link), `pre`, `table` wrapper, and `BlogNewsletterForm`.
- **`components/jsx/`** holds custom MDX-importable components a post can `import` directly: `iframe-responsive`, `video-responsive`, `blockquote`, `azure-network-access-table`. Example in a post: `import IFrameResponsive from '@/components/jsx/iframe-responsive'`.

## Authoring a new post

1. Create `data/blog/<year>/<slug>.mdx` with frontmatter (`title` + `date` required).
2. Set `tags`, `summary`, `images`, `authors: ['default']`, and optionally `layout` / `draft`.
3. Put images under `public/static/images/...` and reference by absolute path.
4. To use rich components, `import` from `@/components/jsx/...` after the frontmatter.
5. `yarn dev` to preview (drafts visible locally); `yarn build` regenerates tag data, search index, and RSS.

## Site configuration

- **`data/siteMetadata.js`** — title, URLs, author, analytics (Google Analytics configured), comments (**giscus**), search (**kbar**, local), newsletter (currently disabled). The single source of site-wide config.
- **`data/headerNavLinks.ts`** — top nav items.
- **`data/projectsData.ts`** — projects page cards.
- **`data/references-data.bib`** — bibliography for citation rehype plugin.
- **`next.config.js`** — wraps `withContentlayer`; defines CSP and security headers, SVGR for SVG imports, remote image patterns, and optional static-export env flags (`EXPORT`, `BASE_PATH`, `UNOPTIMIZED`).

## Scripts & misc

- `scripts/postbuild.mjs` / `scripts/rss.mjs` — generate RSS feeds (site-wide and per-tag) after build.
- `app/seo.tsx` — `genPageMetadata` helper for page metadata.
- `app/api/newsletter/route.ts` — newsletter API route (pliny; inactive while provider is empty).
- `faq/` — template docs (custom MDX components, kbar customization, Docker deploy).

## Gotchas

- Don't hand-edit `app/tag-data.json`, `public/search.json`, or `contentlayer/generated` — they're build outputs.
- Tailwind v4 is CSS-first; there is no `tailwind.config.js`.
- Draft visibility depends on `APP_ROLE`, set by the npm scripts — not `NODE_ENV`.
- Use Yarn (Berry), not npm.
