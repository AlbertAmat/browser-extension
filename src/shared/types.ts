/**
 * Message contract between popup / options / content scripts and the background worker.
 * Add an entry per message: `request` is what the sender passes, `response` what it gets back.
 */
export interface MessageMap {
	ping: { request: void; response: { pong: true; at: number } }
	getActiveTab: { request: void; response: { id?: number; title?: string; url?: string } }
}

export type MessageType = keyof MessageMap
export type MessageRequest<T extends MessageType> = MessageMap[T]['request']
export type MessageResponse<T extends MessageType> = MessageMap[T]['response']

/** Shape of everything persisted in chrome.storage. Defaults live in `storage.ts`. */
export interface StorageSchema {
	settings: {
		theme: 'light' | 'dark' | 'system'
		enabled: boolean
	}
}

export type StorageKey = keyof StorageSchema
