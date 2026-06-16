---
name: generate-blog
description: >-
  Generate new MDX blog posts from note folders in the .genblog directory, written in
  the Tech Appetite voice. Use when the user asks to generate blog posts, write up
  .genblog drafts, or invokes /generate-blog. Scans .genblog for pending folders,
  drafts frontmatter + body from each post.txt, copies referenced images, and (after
  approval) writes the post under data/blog/<year>/ and marks the source folder [done].
---

# Generate Blog

Turn rough note folders under `.genblog/` into finished, publishable MDX posts under
`data/blog/`, written to sound like the existing Tech Appetite catalog.

## When to use

The user wants to generate one or more blog posts from their staged notes. Trigger
phrases: "generate blog", "generate my blog posts", "write up the .genblog drafts",
or the `/generate-blog` command.

---

## Voice & Tone DNA (Tech Appetite)

Match this voice. It was distilled from the existing posts in `data/blog`.

- **Perspective:** First-person practitioner, often plural ("we", "our authoring team",
  "my TEST environment"). You write as someone who hit the problem in real
  production/client work — not a detached documentarian. Confident and opinionated, but
  humble: expose your reasoning ("My instincts were telling me…") and don't pretend the
  path was clean.
- **Structure:**
  - Short context-setting intro explaining *what* the feature/area is and *why* it
    matters before diving in.
  - For troubleshooting posts: a `>` blockquote **TLDR** near the top, and a bold
    **In Summary** / italic recap near the end.
  - Descriptive `##`/`###` headings following a narrative arc — *The Issue →
    investigation → The Fix* for troubleshooting; *Prerequisites → numbered steps* for
    recipes/tutorials.
  - Series posts cross-link via an **Up Next** section.
- **The signature move (troubleshooting):** Detective walk-through — symptom → evidence
  (HAR traces, Network tab, stack traces, App Insights, log streams) → hypothesis → root
  cause → fix. Show the diagnostic *journey*, not just the answer.
- **Technical specificity:** Concrete artifacts everywhere — exact file paths, item
  GUIDs, endpoints, config variable names, language-tagged code fences. Code snippets
  carry inline annotations pointing at the actual change (`// BUGFIX:`,
  `// variantswitcher.js - line 121`). Link inline to official Sitecore/vendor docs and
  GitHub.
- **Personality (keep subtle):** A light dry aside or two is welcome ("Not very
  backwards compatible are we"), but **do not auto-insert GIFs or force jokes** — the
  user adds humor themselves. No gratuitous emoji.
- **Pacing:** Concise, low-filler. Use "Let's…" to bring the reader along. Present tense
  for instructions, past tense for the story of what happened.
- **No filler.** Every paragraph must support the technical solution. Cut marketing
  fluff, restated headings, and generic "in today's fast-paced world" intros.

---

## Workflow

### 1. Scan `.genblog/`

List the **direct child folders** of `.genblog/`. A folder is **pending** if its name
does **not** contain the literal substring `[done]`. Process **every** pending folder in
this run.

If there are no pending folders, say so and stop.

### 2. For each pending folder, read inputs

Each folder contains:
- **`post.txt`** — the author's notes: what to write about, optional date suggestion,
  and image references in the form `insert "filename.png"`.
- **Image files** (`.png`, `.jpg`, `.gif`, etc.) referenced by the notes.

Read `post.txt` in full. Note every `insert "..."` reference and confirm the file
exists in the folder.

### 3. Decide on research

- If the notes give enough information to write the post **and** explicitly ask you not
  to research (e.g. "don't research", "no external research"), then **do not** research —
  write only from the notes.
- Otherwise you may do light web research to fill gaps (verify product behavior, link
  official docs). Keep it minimal and only where it strengthens the technical solution.

### 4. Draft the frontmatter

Build YAML frontmatter following the `Blog` schema (`contentlayer.config.ts`):

```yaml
---
title: '<suggested title>'
date: '<YYYY-MM-DD>'
summary: '<suggested 1–3 sentence summary>'
tags: ['<tag1>', '<tag2>']   # auto-suggest, MAX 5
draft: false                 # ALWAYS false
images: ['<thumbnail path>']
authors: ['default']
---
```

Rules:
- **title** — suggest a specific, descriptive title (your titles often name the symptom,
  e.g. "The Case of the Empty Rendering Variant Switcher Label…").
- **date** — if `post.txt` suggests a date, use it. Otherwise use **today's current date**
  (year + day) in `YYYY-MM-DD` format. Determine the real current date at runtime.
- **summary** — suggest a concise summary describing the problem/outcome.
- **tags** — auto-suggest from content; **never more than 5**. Reuse existing catalog
  tags where they fit (e.g. `Sitecore`, `Sitecore SXA`, `Sitecore JSS`, `Next.js`,
  `Sitecore AI`, `Module Federation`).
- **draft** — always `false`.
- **images** — the main thumbnail. If `post.txt` specifies a main/thumbnail image, use it
  (copy it into `public/static/images/blog-thumbnails/`). If none is specified, default to
  `/static/images/blog-thumbnails/500x300_SitecoreAI.png`.
- **authors** — `['default']` unless notes say otherwise.
- **layout** — omit (defaults to `PostLayout`). Only set `layout: 'PostBanner'` if the
  post is built around a large hero/banner image.

### 5. Plan images

Derive the **post slug** from the finalized title (lowercase, hyphenated, punctuation
stripped). The slug is also the `.mdx` filename.

For each `insert "filename.ext"` in `post.txt`:
- Copy the file from `.genblog/<folder>/filename.ext` to
  `public/static/images/blog-content-images/<slug>/filename.ext` (create the per-post
  subfolder).
- Replace the `insert "..."` line in the body with Markdown image syntax and a
  **descriptive alt text** drawn from the surrounding context:
  `![<descriptive alt>](/static/images/blog-content-images/<slug>/filename.ext)`

A specified main thumbnail goes to `blog-thumbnails/` instead (see step 4). Images in the
folder that are never referenced: mention them but do not insert.

### 6. Optimize copied images

After copying, optimize each raster image **in place** so the repo isn't carrying
oversized screenshots. (Next.js still optimizes at serve time via `next/image`; this is
about keeping the committed originals reasonable.) Use **`sharp`** — already in
`node_modules` (v0.33.x, bundled by Next.js), no install needed.

Rules:
- **Resize:** downscale any image wider than **1600px** to 1600px width, preserving
  aspect ratio. Never upscale smaller images.
- **Recompress in the same format and filename** so the Markdown references stay valid:
  - PNG → `{ compressionLevel: 9, quality: 80, palette: true }`
  - JPEG → `{ quality: 80, mozjpeg: true }`
  - WebP → `{ quality: 80 }`
- **Skip** `.gif` (preserve animation) and `.svg` (vector — don't rasterize).
- Only overwrite when the result is actually smaller; otherwise keep the original.

Reusable command (Node runs from Git Bash or PowerShell):

```bash
node -e '
const sharp = require("sharp"), fs = require("fs"), path = require("path");
const MAX = 1600;
(async () => {
  for (const f of process.argv.slice(1)) {
    const ext = path.extname(f).toLowerCase();
    if (ext === ".gif" || ext === ".svg") { console.log(f, "skipped"); continue; }
    const before = fs.statSync(f).size;
    let img = sharp(f);
    const { width } = await img.metadata();
    if (width > MAX) img = img.resize({ width: MAX, withoutEnlargement: true });
    if (ext === ".png") img = img.png({ compressionLevel: 9, quality: 80, palette: true });
    else if (ext === ".jpg" || ext === ".jpeg") img = img.jpeg({ quality: 80, mozjpeg: true });
    else if (ext === ".webp") img = img.webp({ quality: 80 });
    const buf = await img.toBuffer();
    if (buf.length < before) { fs.writeFileSync(f, buf); console.log(f, (before/1024|0)+"KB ->", (buf.length/1024|0)+"KB"); }
    else console.log(f, "kept", (before/1024|0)+"KB");
  }
})();
' "<path/to/img1>" "<path/to/img2>"
```

Report the before → after sizes in the per-folder summary.

### 7. Suggest custom JSX components (optional)

Existing reusable components live in `components/jsx/` (e.g. `iframe-responsive`,
`video-responsive`, `blockquote`, `azure-network-access-table`). If the post would
benefit from one that doesn't exist yet (e.g. an embedded responsive video, a comparison
table), **propose** creating it during the confirmation step. To use one in MDX, add an
import after the frontmatter, e.g.:

```mdx
import IFrameResponsive from '@/components/jsx/iframe-responsive'
```

Only the components registered in `components/MDXComponents.tsx` plus anything explicitly
imported are usable inside MDX.

### 8. Write the body

Write the post in the Voice & Tone DNA above. Preserve the author's real artifacts from
`post.txt` verbatim where they matter — code blocks, JSON, stack traces, GUIDs, paths,
endpoints — these are the substance. Structure with clear headings and the appropriate
narrative arc. Keep it concise.

### 9. Confirm, then write (per folder)

For **each** pending folder, before writing anything:
1. Present the proposed **title, date, tags, summary**, the **image copy plan**, and any
   **new JSX components** you'd create.
2. Wait for the user's approval (or edits).
3. On approval:
   - Write the post to `data/blog/<year>/<slug>.mdx` (year from the post date; create the
     year folder if needed).
   - Copy the referenced images into `blog-content-images/<slug>/` (and the thumbnail into
     `blog-thumbnails/` if custom).
   - Optimize the copied images in place (step 6).
   - Create any approved JSX components in `components/jsx/`.
   - **Rename the source folder** to append ` [done]` (e.g.
     `page builder media upload failed for page author [done]`) so it's skipped next run.

Do this for every pending folder, confirming each one individually.

---

## Quick reference

| Thing | Value |
|---|---|
| Source notes | `.genblog/<folder>/post.txt` |
| Pending = | folder name has no `[done]` substring |
| Post output | `data/blog/<year>/<slug>.mdx` |
| Content images | `public/static/images/blog-content-images/<slug>/` |
| Image optimization | `sharp` (in node_modules): max 1600px wide, recompress in place, skip gif/svg |
| Thumbnails | `public/static/images/blog-thumbnails/` |
| Default thumbnail | `/static/images/blog-thumbnails/500x300_SitecoreAI.png` |
| Image ref syntax in notes | `insert "filename.png"` |
| `draft` | always `false` |
| Max tags | 5 |
| Custom components | `components/jsx/` (import after frontmatter) |
| Mark done | rename folder + ` [done]` **after approval** |

## Notes

- After posts are written, the user can run `yarn dev` to preview (drafts visible
  locally) or `yarn build` to regenerate tag data, the search index, and RSS.
- Don't hand-edit `app/tag-data.json` or `public/search.json` — they're build outputs.
- The MDX pipeline supports GFM, GitHub-style alerts (`> [!NOTE]`), KaTeX math, code
  titles, and Prism syntax highlighting — use language-tagged fences for code.
