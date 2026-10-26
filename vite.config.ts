import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { fileURLToPath, URL } from 'node:url'
import manifest from './manifest.config.ts'

export default defineConfig({
	plugins: [react(), crx({ manifest })],
	resolve: {
		alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
	},
	server: {
		// Lets the extension pages/content scripts load modules from the dev server (HMR).
		cors: { origin: [/chrome-extension:\/\//] },
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
})
