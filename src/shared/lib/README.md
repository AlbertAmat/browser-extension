# shared/lib/

Framework-free helpers that wrap browser APIs with types. Usable from **every** context, including the background service worker.

## messaging.ts

Typed wrappers around `chrome.runtime` / `chrome.tabs` messaging. All message types are declared in `MessageMap` (`src/shared/types.ts`).

| Function                             | Use it to                                  |
| ------------------------------------ | ------------------------------------------ |
| `sendMessage(type, payload?)`        | Send to the background. Returns a Promise of the response. |
| `sendTabMessage(tabId, type, payload?)` | Send to the content script in a tab.    |
| `onMessage({ type: handler })`       | Handle incoming messages. Handlers may be async. Returns an unsubscribe function. |

Adding a message:

```ts
// 1. types.ts
saveSession: { request: { name: string }; response: { id: string } }

// 2. background/index.ts
onMessage({ saveSession: async ({ name }) => ({ id: await save(name) }) })

// 3. anywhere
const { id } = await sendMessage('saveSession', { name: 'Work' })
```

## storage.ts

Typed wrappers around `chrome.storage.local`. Keys and value shapes come from `StorageSchema`; missing values fall back to `storageDefaults`.

| Function                     | Use it to                                    |
| ---------------------------- | -------------------------------------------- |
| `getItem(key)`               | Read a value (or its default).               |
| `setItem(key, value)`        | Write a value.                               |
| `removeItem(key)`            | Delete a value (next read returns the default). |
| `watchItem(key, callback)`   | React to changes from any context. Returns an unsubscribe function. |

To switch to synced storage across the user's devices, change `area()` to `chrome.storage.sync` (smaller quota: ~100 KB total, 8 KB per item).

## Adding a helper

Name the file after the browser API or concern it wraps (`tabs.ts`, `alarms.ts`, `i18n.ts`). Export plain functions, keep them typed, and don't import React.
