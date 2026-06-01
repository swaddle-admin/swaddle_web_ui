export type ChatResponse =
  | { type: 'token'; value: string }
  | { type: 'intent'; intent: string; message: any }
  | { type: 'done' }
  | { type: 'error'; message: string }

type StreamChatCallbacks = {
  onToken: (token: string) => void
  onIntent: (intent: string, message: any) => void
  onDone: () => void
  onError: (message: string) => void
}

const getBaseUrl = () => {
  const prod = import.meta.env.VITE_API_URL_PROD
  if (!prod) {
    throw new Error('VITE_API_URL_PROD is required in production')
  }
  return prod
}

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

  const intent =
    data?.response?.action_suggested ?? data?.intent ?? data?.action ?? null

  onIntent(intent, data)
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
  userId: number | string,
  callbacks: StreamChatCallbacks,
  signal?: AbortSignal
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
      signal,
    })

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json')

    isJson
      ? await handleJsonResponse(response, rest)
      : await handleStreamResponse(response, rest)
  } catch (err) {
    // Handle abort separately so callers can treat it gracefully
    if ((err as any)?.name === 'AbortError') {
      onError('Cancelled')
      return
    }

    onError(err instanceof Error ? err.message : 'Something went wrong')
  }
}

export const postChatHistory = async (
  userId: number | string,
  role: 'user' | 'assistant',
  content: string
) => {
  try {
    const url = `${getBaseUrl()}/chat-history`
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        role,
        content,
      }),
    })
  } catch (err) {
    /* swallow errors for now */
    console.warn('Failed to save chat history', err)
  }
}

export const createTask = async (payload: any) => {
  try {
    const base =
      import.meta.env.VITE_TASK_MANAGER_URL ||
      import.meta.env.VITE_TASK_MANAGER ||
      'http://localhost:3006/task-manager'

    const url = `${base}/tasks`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return await response.json()
  } catch (err) {
    throw err
  }
}
