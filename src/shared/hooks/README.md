# shared/hooks/

React hooks for the UI pages (popup, options). **Don't import these from `background/` or `content/`**; use `shared/lib/` there.

## useStorage(key)

React state backed by `chrome.storage`, synced live across every open page and context.

```tsx
const [settings, setSettings, loading] = useStorage('settings')

setSettings({ ...settings, enabled: false }) // saves and updates the UI
```

- Returns the default from `storageDefaults` until the stored value loads; `loading` is `true` until then.
- The setter writes the whole value for that key, so spread the old value when changing one field.

## Adding a hook

One hook per file, named `useSomething.ts`. Wrap a `shared/lib/` helper rather than calling `chrome.*` directly, so the logic stays reusable outside React. Examples: `useActiveTab`, `useMessage`.
