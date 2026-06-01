import { useState, useRef } from 'react'
import {
  addMessage,
  setLoading,
  setError,
  updateMessage,
} from '../store/slices/chatSlice'
import { streamChat, postChatHistory, createTask } from '../utils/chatApi'
import useAppDispatch from './useAppDispatch'
import type { Message } from '../types'
import { auth } from '../utils/firebase'

const useMessageInput = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')

  const createMessage = (role: Message['role'], content: string): Message => ({
    id: crypto.randomUUID(),
    role,
    content,
    contentType: 'text',
    timestamp: new Date().toISOString(),
  })

  const abortRef = useRef<AbortController | null>(null)

  const handleSend = async () => {
    if (!value.trim()) return

    const userMessage = createMessage('user', value.trim())
    dispatch(addMessage(userMessage))
    setValue('')

    const userId = auth.currentUser?.uid ?? 97
    const aiMessage = createMessage('assistant', '')
    dispatch(addMessage(aiMessage))
    dispatch(setLoading(true))

    let aiContent = ''
    const saveUserPrompt = () => postChatHistory(userId, 'user', userMessage.content)

    // create an abort controller so the request can be cancelled
    const controller = new AbortController()
    abortRef.current = controller

    await streamChat(
      userMessage.content,
      userId,
      {
      onToken: (token) => {
        aiContent += token
        dispatch(updateMessage({ id: aiMessage.id, content: aiContent }))
      },
      onIntent: (_intent, message) => {
        // If the server passed a full object (e.g., schedule create), store
        // the parsed JSON and mark the message as action_buttons so the UI
        // can render buttons like "Add Task".
        if (typeof message === 'object') {
          dispatch(
            updateMessage({
              id: aiMessage.id,
              content: JSON.stringify(message),
              contentType: 'action_buttons',
            })
          )
          return
        }

        dispatch(
          updateMessage({
            id: aiMessage.id,
            content: message,
            contentType: 'card',
          })
        )
      },
      onDone: async () => {
        dispatch(setLoading(false))
        saveUserPrompt()
        postChatHistory(userId, 'assistant', aiContent)
      },
      onError: (error) => {
        dispatch(setError(error))
        dispatch(setLoading(false))
        saveUserPrompt()
      },
    },
      controller.signal
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend()
  }

  const cancel = () => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    dispatch(setLoading(false))
    dispatch(setError('Cancelled'))
  }

  return { value, setValue, handleSend, handleKeyDown, cancel }
}

export default useMessageInput
