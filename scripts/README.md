# scripts/

Node scripts for build and release tasks. They run on your machine, never inside the extension. Run them through `npm run` scripts in `package.json`.

| Script   | Run with      | What it does                                                        |
| -------- | ------------- | ------------------------------------------------------------------- |
| `zip.js` | `npm run zip` | Builds, then zips `dist/` into `release/<name>-<version>.zip` for the Chrome Web Store / Edge Add-ons. README files are left out. |

## Adding a script

Write it as an ES module (`.js`, `import` syntax), add an entry to `scripts` in `package.json`, and list it in the table above. Examples: bumping the version, generating icons from one SVG, building a Firefox variant.

`release/` is git-ignored.
