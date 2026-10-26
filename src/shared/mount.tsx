import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/shared/AppProviders'

/** Render a page component into `#root` with the shared providers. */
export function mount(node: ReactNode) {
	const container = document.getElementById('root')
	if (!container) throw new Error('#root element not found')

	createRoot(container).render(
		<StrictMode>
			<AppProviders>{node}</AppProviders>
		</StrictMode>,
	)
}
