import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json' with { type: 'json' }

// Name, description and version come from package.json so there is one source of truth.
export default defineManifest({
	manifest_version: 3,
	name: pkg.displayName ?? pkg.name,
	description: pkg.description,
	version: pkg.version,
	icons: {
		16: 'icons/16.png',
		32: 'icons/32.png',
		48: 'icons/48.png',
		128: 'icons/128.png',
	},
	permissions: ['storage', 'activeTab'],
	action: {
		default_popup: 'src/popup/index.html',
		default_icon: { 16: 'icons/16.png', 32: 'icons/32.png' },
	},
	options_ui: { page: 'src/options/index.html', open_in_tab: true },
	background: { service_worker: 'src/background/index.ts', type: 'module' },
	content_scripts: [
		{ matches: ['https://*/*'], js: ['src/content/index.ts'] },
	],
})
