# src/

All extension source code. Each top-level folder is one **extension context**: a separate JavaScript environment the browser runs on its own.

| Folder        | Context          | Runs where                                 | Has DOM / React? |
| ------------- | ---------------- | ------------------------------------------ | ---------------- |
| `background/` | Service worker   | Browser background, no window              | No               |
| `content/`    | Content script   | Inside web pages that match the manifest   | Page DOM, no React by default |
| `popup/`      | Extension page   | Toolbar popup                              | Yes              |
| `options/`    | Extension page   | Options tab                                | Yes              |
| `shared/`     | (not a context)  | Code imported by any of the above          | —                |

## Rules

- Contexts **do not share memory**. They talk through messaging (`@/shared/lib/messaging`) and share state through `chrome.storage` (`@/shared/lib/storage`).
- Every entry point is registered in `manifest.config.ts`. A new folder does nothing until the manifest points to it.
- Import with the `@` alias: `import { getItem } from '@/shared/lib/storage'`.
- Code used by more than one context goes in `shared/`. Never import from one context folder into another (e.g. `popup/` → `options/`).

## Adding a new context

1. Create the folder (e.g. `sidepanel/`). For a UI page, copy `popup/`.
2. Register it in `manifest.config.ts` and add any permission it needs.
3. Document it in a README.md in the new folder.
