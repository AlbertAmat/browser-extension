# options/

The **options page**: the extension's settings screen, opened in a full tab. Registered in `manifest.config.ts` under `options_ui` (`open_in_tab: true`).

Users reach it from the popup's **Options** button (`chrome.runtime.openOptionsPage()`), or by right-clicking the toolbar icon → **Options**.

## Files

| File          | Purpose                                                          |
| ------------- | ---------------------------------------------------------------- |
| `index.html`  | HTML shell with `#root`. Loads `main.tsx`.                       |
| `main.tsx`    | Entry: `mount(<Options />)` wraps it with theme providers.       |
| `Options.tsx` | Root component with the settings form.                           |

## How settings work

Settings live in `chrome.storage` under the `settings` key. To add one:

1. Add the field to `StorageSchema['settings']` in `src/shared/types.ts`.
2. Add its default to `storageDefaults` in `src/shared/lib/storage.ts`.
3. Add a control here:

```tsx
const [settings, setSettings] = useStorage('settings')
<Switch checked={settings.myFlag} onChange={(_, myFlag) => setSettings({ ...settings, myFlag })} />
```

Changes save immediately and every other context (popup, background, content) sees them through `useStorage` / `watchItem`.

## Debugging

It's a normal tab: open DevTools with F12.
