import type { StorageKey, StorageSchema } from '@/shared/types'

export const storageDefaults: StorageSchema = {
	settings: { theme: 'system', enabled: true },
}

const area = () => chrome.storage.local

export async function getItem<K extends StorageKey>(key: K): Promise<StorageSchema[K]> {
	const result = await area().get(key)
	return (result[key] as StorageSchema[K] | undefined) ?? storageDefaults[key]
}

export async function setItem<K extends StorageKey>(key: K, value: StorageSchema[K]): Promise<void> {
	await area().set({ [key]: value })
}

export async function removeItem(key: StorageKey): Promise<void> {
	await area().remove(key)
}

/** Subscribe to changes of a single key. Returns an unsubscribe function. */
export function watchItem<K extends StorageKey>(
	key: K,
	callback: (value: StorageSchema[K]) => void,
): () => void {
	const listener = (changes: Record<string, chrome.storage.StorageChange>, areaName: string) => {
		if (areaName !== 'local' || !(key in changes)) return
		callback((changes[key].newValue as StorageSchema[K] | undefined) ?? storageDefaults[key])
	}
	chrome.storage.onChanged.addListener(listener)
	return () => chrome.storage.onChanged.removeListener(listener)
}
