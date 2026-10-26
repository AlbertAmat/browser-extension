# popup/

The **toolbar popup**: the small window that opens when the user clicks the extension icon. Registered in `manifest.config.ts` under `action.default_popup`.

## Files

| File         | Purpose                                                          |
| ------------ | ---------------------------------------------------------------- |
| `index.html` | HTML shell with `#root`. Loads `main.tsx`. Rarely needs changes. |
| `main.tsx`   | Entry: `mount(<Popup />)` wraps it with theme providers.         |
| `Popup.tsx`  | Root component. Build the UI from here.                          |

## What goes here

- Quick actions and status for the current tab.
- Components used only by the popup (create `components/` here as it grows).

## Gotchas

- **The popup is destroyed when it closes.** Its React state is lost. Persist anything important with `useStorage(...)`, and run long tasks in the background.
- Size is set by the content. Give the root a fixed width (currently `320px`); Chrome caps it at 800×600.
- Get the current tab through the background (`sendMessage('getActiveTab')`) or `chrome.tabs.query` (needs the `activeTab` or `tabs` permission).

## Debugging

Open the popup, right-click inside it → **Inspect**.
