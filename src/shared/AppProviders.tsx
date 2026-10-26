import { useEffect, type ReactNode } from 'react'
import { CssBaseline, ThemeProvider, useColorScheme } from '@mui/material'
import { useStorage } from '@/shared/hooks/useStorage'
import { theme } from '@/shared/theme'

function ThemeSync() {
	const [settings] = useStorage('settings')
	const { setMode } = useColorScheme()
	useEffect(() => setMode(settings.theme), [settings.theme, setMode])
	return null
}

/** Wraps every extension page (popup, options, ...) with the shared theme. */
export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={theme} defaultMode="system">
			<CssBaseline />
			<ThemeSync />
			{children}
		</ThemeProvider>
	)
}
