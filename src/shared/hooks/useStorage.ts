import { useCallback, useEffect, useState } from 'react'
import { getItem, setItem, storageDefaults, watchItem } from '@/shared/lib/storage'
import type { StorageKey, StorageSchema } from '@/shared/types'

/** React state backed by chrome.storage, kept in sync across popup, options and background. */
export function useStorage<K extends StorageKey>(key: K) {
	const [value, setValue] = useState<StorageSchema[K]>(storageDefaults[key])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let active = true
		getItem(key).then((stored) => {
			if (!active) return
			setValue(stored)
			setLoading(false)
		})
		const unwatch = watchItem(key, setValue)
		return () => {
			active = false
			unwatch()
		}
	}, [key])

	const update = useCallback(
		(next: StorageSchema[K]) => {
			setValue(next)
			return setItem(key, next)
		},
		[key],
	)

	return [value, update, loading] as const
}
