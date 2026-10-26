# public/

Static files copied **as-is** into the root of `dist/`. Vite does not process them and they keep their filenames.

## What goes here

- `icons/`: extension icons referenced by `manifest.config.ts`, at 16, 32, 48 and 128 px (PNG). Replace them for each new extension; keep the same names or update the manifest.
- Files that must keep a fixed path: `_locales/` for translations (`_locales/en/messages.json`), static JSON data, fonts referenced by path.

## What does NOT go here

Images and CSS used by React components. Put those next to the component and `import` them, so Vite bundles and hashes them.

## Notes

- Reference these files by root path: `icons/48.png` in the manifest, `chrome.runtime.getURL('icons/48.png')` in code.
- To use a file in web pages (from a content script), list it under `web_accessible_resources` in the manifest.
- This README is copied into `dist/` too, but `npm run zip` leaves it out of the store package.
