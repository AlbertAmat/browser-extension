# shared/

Code shared by every context (background, content, popup, options). Nothing here runs by itself; it is only imported.

## Files

| Path                 | Purpose                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `types.ts`           | **The contracts.** `MessageMap` (all messages) and `StorageSchema` (all stored data). Start here when adding a feature. |
| `lib/`               | Plain TypeScript helpers (no React). Safe to use anywhere, including the service worker. |
| `hooks/`             | React hooks. Only for UI pages (popup, options, content UI).         |
| `components/`        | Reusable React components shared by several UI pages.                |
| `theme.ts`           | MUI theme: colors, typography, light/dark.                           |
| `AppProviders.tsx`   | Wraps every page with `ThemeProvider` + `CssBaseline` and syncs the theme setting. |
| `mount.tsx`          | `mount(<Page />)`: renders a page into `#root` with providers. Used by each `main.tsx`. |

## Rules

- **Keep `lib/` free of React and the DOM.** The background service worker imports it and has no `window`.
- Anything used by only one context belongs in that context's folder, not here.
- Shared React components go in `components/`.
- Add to `types.ts` first, then implement. TypeScript then shows you every place that needs updating.
