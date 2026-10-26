import { sendMessage } from '@/shared/lib/messaging'
import { getItem } from '@/shared/lib/storage'

async function main() {
	const settings = await getItem('settings')
	if (!settings.enabled) return

	const { at } = await sendMessage('ping')
	console.log('[content] connected to background at', new Date(at).toISOString())
}

main().catch((error: unknown) => console.error('[content]', error))
