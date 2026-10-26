# background/

The extension's **service worker** (Manifest V3). Registered in `manifest.config.ts` under `background.service_worker`.

## What goes here

- Message handlers that other contexts call with `sendMessage(...)`.
- Browser event listeners: `chrome.runtime.onInstalled`, `chrome.tabs.*`, `chrome.alarms`, `chrome.contextMenus`, `chrome.commands`, etc.
- Work that needs privileged APIs or must outlive the popup (the popup closes as soon as it loses focus).

## What does NOT go here

- DOM code: there is no `window` or `document`.
- React components.

## How it works

`index.ts` is the entry. It:

1. Seeds default settings on first install (`onInstalled`).
2. Registers handlers with `onMessage({ ... })`. Each key must exist in `MessageMap` (`src/shared/types.ts`), so request and response are type-checked.

```ts
onMessage({
	ping: () => ({ pong: true, at: Date.now() }),
})
```

## Gotchas

- **The worker is short-lived.** Chrome stops it after ~30 s idle. Don't keep state in variables; store it with `@/shared/lib/storage`.
- **Register listeners at the top level**, synchronously. Listeners added inside `await` or a timeout may miss the event that woke the worker.
- Use `chrome.alarms` instead of `setInterval` for periodic work.
- As it grows, split into files (e.g. `handlers/tabs.ts`, `events/install.ts`) and import them from `index.ts`.

## Debugging

`chrome://extensions` → your extension → **Inspect views: service worker**.
