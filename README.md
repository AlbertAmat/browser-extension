# Browser Extension Starter

Base template for Manifest V3 browser extensions using **React 19**, **TypeScript**, **Vite** and **[CRXJS](https://crxjs.dev)**, with **MUI** for UI.

## Getting started

```bash
npm install
npm run dev      # dev build with HMR, output in dist/
```

Load it in Chrome / Edge / Brave:

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and select the `dist/` folder.
3. Keep `npm run dev` running: popup/options pages hot-reload, and background/content scripts reload the extension on save.

## Scripts

| Script             | What it does                                         |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Vite dev server + watch build into `dist/`           |
| `npm run build`    | Type-check and build a production bundle in `dist/`  |
| `npm run zip`      | Build, then zip `dist/` to `release/<name>-<version>.zip` for store upload |
| `npm run typecheck`| Type-check only                                      |
| `npm run lint`     | ESLint (`lint:fix` to auto-fix)                      |

## Project structure

```
├── manifest.config.ts        # MV3 manifest (name/description/version come from package.json)
├── vite.config.ts            # React + CRXJS, `@` → src alias
├── public/
│   └── icons/                # Extension icons (16/32/48/128), copied as-is
├── scripts/
│   └── zip.js                # Packages dist/ for the stores
└── src/
    ├── background/index.ts   # Service worker: message handlers, lifecycle events
    ├── content/
    │   ├── index.ts          # Content script injected into matching pages
    │   └── ui/               # React UI injected into pages (Shadow DOM)
    ├── popup/                # Toolbar popup (index.html → main.tsx → Popup.tsx)
    ├── options/              # Options page (index.html → main.tsx → Options.tsx)
    └── shared/
        ├── types.ts          # MessageMap + StorageSchema: the typed contracts
        ├── theme.ts          # MUI theme (light/dark)
        ├── AppProviders.tsx  # Theme + CssBaseline wrapper for every page
        ├── mount.tsx         # mount(<Page />) helper used by each page's main.tsx
        ├── components/       # Reusable React components
        ├── hooks/useStorage.ts
        └── lib/
            ├── messaging.ts  # sendMessage / sendTabMessage / onMessage (typed)
            └── storage.ts    # getItem / setItem / watchItem (typed, with defaults)
```

Every folder has its own `README.md` explaining what goes there and how it works:
[src](src/README.md) · [background](src/background/README.md) · [content](src/content/README.md) · [content/ui](src/content/ui/README.md) · [popup](src/popup/README.md) · [options](src/options/README.md) · [shared](src/shared/README.md) · [shared/lib](src/shared/lib/README.md) · [shared/hooks](src/shared/hooks/README.md) · [shared/components](src/shared/components/README.md) · [public](public/README.md) · [scripts](scripts/README.md)

## Common tasks

**Add a message** — add an entry to `MessageMap` in `src/shared/types.ts`, handle it in `src/background/index.ts` via `onMessage({...})`, and call `sendMessage('yourType', payload)` from any page or content script. Request and response are type-checked end to end.

**Persist data** — add a key to `StorageSchema` and its default to `storageDefaults` in `src/shared/lib/storage.ts`. In React use `const [value, setValue] = useStorage('key')`; it stays in sync across all extension contexts.

**Add a page** (e.g. side panel) — copy `src/popup/`, then register its `index.html` in `manifest.config.ts` (e.g. `side_panel: { default_path: 'src/sidepanel/index.html' }`) and add the `sidePanel` permission.

**Change permissions / matches** — edit `manifest.config.ts`. Only request what you need; store reviewers check this.

## Starting a new extension from this template

1. Clone/copy the repo and delete `.git`, then `git init`.
2. In `package.json` update `name`, `displayName`, `description` and `version`.
3. Replace the icons in `public/icons/`.
4. Adjust `permissions` and `content_scripts.matches` in `manifest.config.ts`.
5. `npm install && npm run dev`.

Tip: on GitHub you can mark this repo as a **Template repository** (Settings → General) and use **Use this template** for each new extension.

## Notes

- Targets Chromium browsers. For Firefox, CRXJS supports `crx({ manifest, browser: 'firefox' })`; Firefox MV3 uses `background.scripts` instead of `service_worker`, so the manifest needs a small per-browser tweak.
- The build prints a `rollupOptions`/`rolldownOptions` warning from CRXJS on Vite 8. It is harmless.
