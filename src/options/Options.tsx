import {
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Paper,
	Radio,
	RadioGroup,
	Stack,
	Switch,
	Typography,
} from '@mui/material'
import { useStorage } from '@/shared/hooks/useStorage'
import type { StorageSchema } from '@/shared/types'

type ThemeSetting = StorageSchema['settings']['theme']

export default function Options() {
	const [settings, setSettings, loading] = useStorage('settings')

	if (loading) return null

	return (
		<Container maxWidth="sm" sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Options
			</Typography>

			<Paper variant="outlined" sx={{ p: 3 }}>
				<Stack spacing={3}>
					<FormControlLabel
						control={
							<Switch
								checked={settings.enabled}
								onChange={(_, enabled) => setSettings({ ...settings, enabled })}
							/>
						}
						label="Enable extension"
					/>

					<FormControl>
						<FormLabel>Theme</FormLabel>
						<RadioGroup
							row
							value={settings.theme}
							onChange={(_, theme) => setSettings({ ...settings, theme: theme as ThemeSetting })}
						>
							<FormControlLabel value="system" control={<Radio />} label="System" />
							<FormControlLabel value="light" control={<Radio />} label="Light" />
							<FormControlLabel value="dark" control={<Radio />} label="Dark" />
						</RadioGroup>
					</FormControl>
				</Stack>
			</Paper>
		</Container>
	)
}
