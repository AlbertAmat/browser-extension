# content/

**Content script** injected into web pages. Registered in `manifest.config.ts` under `content_scripts`; `matches` controls which sites it runs on.

## What goes here

- Code that reads or changes the page DOM (scrape content, highlight text, add buttons).
- Bridging page data to the extension through messaging.

## What it can and can't do

- ✅ Full access to the page's DOM.
- ✅ `chrome.runtime` (messaging), `chrome.storage`, `chrome.i18n`.
- ❌ Most other `chrome.*` APIs (`tabs`, `windows`, ...). Ask the background with `sendMessage(...)` instead.
- ❌ The page's own JS variables. Content scripts run in an isolated world.

## How it works

`index.ts` is the entry. It reads settings, then talks to the background:

```ts
const { at } = await sendMessage('ping')
```

To receive messages **from** the extension (e.g. popup → this tab), register handlers here with `onMessage({...})` and call them from the other side with `sendTabMessage(tabId, 'type')`.

## Gotchas

- Code runs on every matching page load. Keep it light and narrow `matches` to the sites you need.
- Page CSS can leak into anything you inject. For injected React UI, use `ui/`: it explains the Shadow DOM + MUI setup.
- After changing `matches` or permissions, reload the extension in `chrome://extensions`.

## Debugging

Open DevTools on the web page. Logs appear in its console; pick the extension in the context dropdown to run code in the content script's world.
