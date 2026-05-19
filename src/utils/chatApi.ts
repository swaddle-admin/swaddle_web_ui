export type ChatResponse =
  | { type: 'token'; value: string }
  | { type: 'intent'; intent: string; message: string }
  | { type: 'done' }
  | { type: 'error'; message: string }

type StreamChatCallbacks = {
  onToken: (token: string) => void
  onIntent: (intent: string, message: string) => void
  onDone: () => void
  onError: (message: string) => void
}

const getBaseUrl = () =>
  import.meta.env.PROD
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV

const parseSSELines = (chunk: string) =>
  chunk
    .split('\n')
    .filter((line) => line.startsWith('data: '))
    .map((line) => line.replace('data: ', '').trim())

const cleanStreamToken = (token: string) =>
  token
    .replace(/\[meta\][\s\S]*?\[\/meta\]/g, '')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )

const handleJsonResponse = async (
  response: Response,
  { onIntent, onDone }: Pick<StreamChatCallbacks, 'onIntent' | 'onDone'>
) => {
  const data = await response.json()
  onIntent(data.intent, data.message)
  onDone()
}

const handleStreamResponse = async (
  response: Response,
  { onToken, onDone }: Pick<StreamChatCallbacks, 'onToken' | 'onDone'>
) => {
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  if (!reader) return

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value, { stream: true })

    for (const data of parseSSELines(chunk)) {
      if (data === '[DONE]') {
        onDone()
        return
      }

      try {
        const parsed = JSON.parse(data)

        if (parsed.token) {
          const token = cleanStreamToken(parsed.token)

          if (!token) continue

          for (const char of token) {
            onToken(char)
            await delay(5)
          }
        }
      } catch {
        // skip malformed lines
      }
    }
  }
}

export const streamChat = async (
  prompt: string,
  userId: number,
  callbacks: StreamChatCallbacks
) => {
  const { onError, ...rest } = callbacks

  try {
    const url = `${getBaseUrl()}/chat/`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        user_id: userId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    })

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json')

    isJson
      ? await handleJsonResponse(response, rest)
      : await handleStreamResponse(response, rest)
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Something went wrong')
  }
}
