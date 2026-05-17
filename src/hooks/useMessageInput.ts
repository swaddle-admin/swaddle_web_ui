import { useState } from 'react'
import {
  addMessage,
  setLoading,
  setError,
  updateMessage,
} from '../store/slices/chatSlice'
import { streamChat } from '../utils/chatApi'
import useAppSelector from './useAppSelector'
import useAppDispatch from './useAppDispatch'
import type { Message } from '../types'

const useMessageInput = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const user = useAppSelector((state) => state.chat) // ← was state.chat?.  (dangling dot)

  const handleSend = async () => {
    if (!value.trim()) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: value.trim(),
      contentType: 'text',
      timestamp: new Date(),
    }
    dispatch(addMessage(userMessage))
    setValue('')
    dispatch(setLoading(true))

    const aiMessageId = crypto.randomUUID()
    let aiContent = ''

    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      contentType: 'text',
      timestamp: new Date(),
    }
    dispatch(addMessage(aiMessage))

    await streamChat(
      userMessage.content,
      'user_123',
      (token) => {
        aiContent += token
        dispatch(updateMessage({ id: aiMessageId, content: aiContent }))
      },
      (intent, message) => {
        dispatch(
          updateMessage({
            id: aiMessageId,
            content: message,
            contentType: 'card',
          })
        )
      },
      () => {
        dispatch(setLoading(false))
      },
      (error) => {
        dispatch(setError(error))
        dispatch(setLoading(false))
      }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend()
  }

  return { value, setValue, handleSend, handleKeyDown }
}

export default useMessageInput
