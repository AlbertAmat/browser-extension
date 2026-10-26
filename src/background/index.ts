import { onMessage } from '@/shared/lib/messaging'
import { getItem, setItem, storageDefaults } from '@/shared/lib/storage'

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
		await setItem('settings', storageDefaults.settings)
	}
	console.log(`[background] ${reason}`, await getItem('settings'))
})

onMessage({
	ping: () => ({ pong: true, at: Date.now() }),
	getActiveTab: async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
		return { id: tab?.id, title: tab?.title, url: tab?.url }
	},
})
