import { useState } from 'react'
import {
  addMessage,
  setLoading,
  setError,
  updateMessage,
} from '../store/slices/chatSlice'
import { streamChat } from '../utils/chatApi'
import useAppDispatch from './useAppDispatch'
import type { Message } from '../types'

const useMessageInput = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')

  const createMessage = (role: Message['role'], content: string): Message => ({
    id: crypto.randomUUID(),
    role,
    content,
    contentType: 'text',
    timestamp: new Date(),
  })

  const handleSend = async () => {
    if (!value.trim()) return

    const userMessage = createMessage('user', value.trim())
    dispatch(addMessage(userMessage))
    setValue('')

    const aiMessage = createMessage('assistant', '')
    dispatch(addMessage(aiMessage))
    dispatch(setLoading(true))

    let aiContent = ''

    await streamChat(userMessage.content, 'user_123', {
      onToken: (token) => {
        aiContent += token
        dispatch(updateMessage({ id: aiMessage.id, content: aiContent }))
      },
      onIntent: (_intent, message) => {
        dispatch(
          updateMessage({
            id: aiMessage.id,
            content: message,
            contentType: 'card',
          })
        )
      },
      onDone: () => {
        dispatch(setLoading(false))
      },
      onError: (error) => {
        dispatch(setError(error))
        dispatch(setLoading(false))
      },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend()
  }

  return { value, setValue, handleSend, handleKeyDown }
}

export default useMessageInput
