import { useEffect, useState } from 'react'
import { Box, Button, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { sendMessage } from '@/shared/lib/messaging'
import { useStorage } from '@/shared/hooks/useStorage'
import type { MessageResponse } from '@/shared/types'

export default function Popup() {
	const [settings, setSettings] = useStorage('settings')
	const [tab, setTab] = useState<MessageResponse<'getActiveTab'>>()

	useEffect(() => {
		sendMessage('getActiveTab').then(setTab)
	}, [])

	return (
		<Box sx={{ width: 320, p: 2 }}>
			<Stack spacing={2}>
				<Typography variant="h6">{chrome.runtime.getManifest().name}</Typography>

				<Typography variant="body2" color="text.secondary" noWrap title={tab?.url}>
					{tab?.title ?? 'No active tab'}
				</Typography>

				<FormControlLabel
					control={
						<Switch
							checked={settings.enabled}
							onChange={(_, enabled) => setSettings({ ...settings, enabled })}
						/>
					}
					label="Enabled"
				/>

				<Button variant="outlined" onClick={() => chrome.runtime.openOptionsPage()}>
					Options
				</Button>
			</Stack>
		</Box>
	)
}
