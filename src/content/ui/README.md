# content/ui/

React UI that the **content script injects into web pages**: floating buttons, toolbars, side overlays, in-page dialogs.

If the content script only reads or tweaks the page's DOM, you don't need this folder. Use it when you render your own interface on top of a site.

## Why it needs its own setup

The UI runs inside someone else's page, so:

- **Their CSS hits your UI** and **your CSS can hit their page.** Fix: render inside a **Shadow DOM**, which isolates styles in both directions.
- **MUI/Emotion injects `<style>` tags into `document.head` by default**, which is outside the shadow root, so your components would show up unstyled. Fix: give Emotion a cache whose `container` is the shadow root.
- **Popovers (Menu, Dialog, Tooltip, Select) portal to `document.body`** by default, also outside the shadow root. Fix: point their `container` at an element inside the shadow root.

## Suggested files

| File         | Purpose                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| `mount.tsx`  | Creates the host element + shadow root and renders the React app into it. |
| `App.tsx`    | Root component of the injected UI.                                        |
| `components/`| Components used only by the injected UI. Shared ones go in `src/shared/components/`. |

## Mount pattern

```tsx
// mount.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/shared/theme'
import App from './App'

export function mountContentUI() {
	const host = document.createElement('div')
	host.id = 'my-extension-root' // use a unique id per extension
	document.body.append(host)

	const shadow = host.attachShadow({ mode: 'open' })
	const styles = document.createElement('div') // Emotion writes <style> tags here
	const root = document.createElement('div')   // React renders here; also the portal target
	shadow.append(styles, root)

	const cache = createCache({ key: 'ext', container: styles })

	createRoot(root).render(
		<StrictMode>
			<CacheProvider value={cache}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App portalContainer={root} />
				</ThemeProvider>
			</CacheProvider>
		</StrictMode>,
	)

	return () => host.remove()
}
```

Then call it from the content script entry:

```ts
// src/content/index.ts
import { mountContentUI } from './ui/mount'

mountContentUI()
```

`@emotion/cache` comes with `@emotion/react`; if TypeScript can't find it, run `npm install @emotion/cache`.

## Rules

- **Keep everything inside the shadow root.** For MUI popovers, pass the container: `<Menu container={portalContainer} ...>` or set `slotProps` / `disablePortal`.
- Use a unique `id` and Emotion `key` per extension, so two extensions built from this template don't clash on the same page.
- Don't rely on page fonts or CSS. `CssBaseline` and the theme set what you need. Note that `rem` units still follow the page's `<html>` font size; use `px` in the theme if a site breaks your sizing.
- Set a high `z-index` on your fixed-position wrapper so the site's UI doesn't cover it.
- Talk to the extension through `sendMessage(...)` and `useStorage(...)`, the same as the popup.
- Images and fonts need `chrome.runtime.getURL(...)` and must be listed in `web_accessible_resources` in the manifest. Assets imported in code are handled by CRXJS.

## Debugging

Open DevTools on the web page. In the Elements panel, expand `#my-extension-root` → `#shadow-root` to inspect your UI.
