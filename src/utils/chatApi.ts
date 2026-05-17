import { API } from './constants'

export type ChatResponse =
  | { type: 'token'; value: string }
  | { type: 'intent'; intent: string; message: string }
  | { type: 'done' }
  | { type: 'error'; message: string }

export const streamChat = async (
  prompt: string,
  userId: string,
  onToken: (token: string) => void,
  onIntent: (intent: string, message: string) => void,
  onDone: () => void,
  onError: (message: string) => void
) => {
  try {
    const response = await fetch(`${API.baseUrl}${API.chatEndpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        user_id: userId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    })

    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const data = await response.json()
      onIntent(data.intent, data.message)
      onDone()
      return
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) return

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk
        .split('\n')
        .filter((line) => line.startsWith('data: '))

      for (const line of lines) {
        const data = line.replace('data: ', '').trim()

        if (data === '[DONE]') {
          onDone()
          return
        }

        try {
          const parsed = JSON.parse(data)
          if (parsed.token && !parsed.token.startsWith('[meta]')) {
            onToken(parsed.token)
          }
        } catch {
          // skip malformed lines
        }
      }
    }
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Something went wrong')
  }
}
