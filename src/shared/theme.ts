import { createTheme } from '@mui/material/styles'

// `colorSchemes` gives light + dark out of the box; MUI follows the OS preference by default.
export const theme = createTheme({
	cssVariables: { colorSchemeSelector: 'class' },
	colorSchemes: { light: true, dark: true },
	shape: { borderRadius: 8 },
	typography: {
		fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
	},
})
