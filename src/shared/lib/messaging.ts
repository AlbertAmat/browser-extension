import type { MessageMap, MessageRequest, MessageResponse, MessageType } from '@/shared/types'

interface Envelope<T extends MessageType = MessageType> {
	type: T
	payload: MessageRequest<T>
}

type Handler<T extends MessageType> = (
	payload: MessageRequest<T>,
	sender: chrome.runtime.MessageSender,
) => MessageResponse<T> | Promise<MessageResponse<T>>

export type Handlers = { [T in MessageType]?: Handler<T> }

/** Send a typed message to the background worker. */
export function sendMessage<T extends MessageType>(
	type: T,
	...[payload]: MessageRequest<T> extends void ? [] : [MessageRequest<T>]
): Promise<MessageResponse<T>> {
	return chrome.runtime.sendMessage({ type, payload } satisfies Envelope<T>)
}

/** Send a typed message to the content script running in a tab. */
export function sendTabMessage<T extends MessageType>(
	tabId: number,
	type: T,
	...[payload]: MessageRequest<T> extends void ? [] : [MessageRequest<T>]
): Promise<MessageResponse<T>> {
	return chrome.tabs.sendMessage(tabId, { type, payload } satisfies Envelope<T>)
}

/** Register handlers for incoming messages. Returns an unsubscribe function. */
export function onMessage(handlers: Handlers): () => void {
	const listener = (
		message: Envelope,
		sender: chrome.runtime.MessageSender,
		sendResponse: (response: unknown) => void,
	) => {
		const handler = handlers[message?.type] as Handler<MessageType> | undefined
		if (!handler) return false

		Promise.resolve(handler(message.payload, sender))
			.then(sendResponse)
			.catch((error: unknown) => {
				console.error(`[messaging] "${message.type}" failed`, error)
				sendResponse(undefined)
			})
		return true // keep the channel open for the async response
	}

	chrome.runtime.onMessage.addListener(listener)
	return () => chrome.runtime.onMessage.removeListener(listener)
}

export type { MessageMap }
