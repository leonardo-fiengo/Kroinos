# Kroinos editorial studio

The private studio lives at `/article`. It is intentionally absent from the public navigation and sitemap. Public stories use `/article/<slug>`.

## Local setup

Create `.env.local` (it is ignored by Git) and add:

```env
ADMIN_ACCESS_KEY=choose-a-private-key-at-least-12-characters-long
ADMIN_SESSION_SECRET=choose-a-separate-random-value-at-least-32-characters-long
```

Start the site with `npm run dev`, then open `http://localhost:3000/article`. Local publishing writes article data to `content/articles.json` and uploaded covers to `public/uploads/`.

The first screen is the article library, with clear actions to create, edit, open, or delete a story. Opening an article brings up the canvas editor: write titles and paragraphs directly in the live preview, insert blocks between existing content, and use the right panel for formatting and publishing settings. Images can be selected from the computer for both the cover and content blocks.

Drag a block by its handle to reorder it, or use the visible move buttons on touch screens and with the keyboard. The editor saves a local recovery copy automatically, supports undo/redo (`Ctrl/Cmd + Z`), and shows the current save state in the top bar. Use the desktop/mobile controls to check both layouts, or choose the full preview for an uninterrupted article view.

## Production publishing

Serverless deployments such as Vercel cannot persist local file writes. Add these environment variables to the deployment:

```env
KROINOS_GITHUB_TOKEN=github_pat_...
KROINOS_GITHUB_REPOSITORY=owner/repository
KROINOS_GITHUB_BRANCH=main
```

Use a fine-grained GitHub token limited to this repository with **Contents: Read and write** permission. Keep it server-side; never prefix it with `NEXT_PUBLIC_`.

In GitHub mode, Publish writes the article and its cover to the configured branch. The site reads the article store from that branch immediately, and a connected deployment can rebuild from the resulting commit.

## Security notes

- The URL is hidden for convenience, but the access key is the real security boundary.
- Login attempts are rate-limited and successful login creates an HTTP-only, same-site cookie lasting 12 hours.
- The admin page has `noindex` metadata and all admin APIs require the signed session.
- Rotate both admin values if either is exposed.
