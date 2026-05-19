import { describe, it, expect } from 'vitest'
import chatReducer, {
  addMessage,
  setLoading,
  setError,
  clearMessages,
} from '../store/slices/chatSlice'
import type { ChatState, Message } from '../types'

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
}

const mockMessage: Message = {
  id: '123',
  role: 'user',
  content: 'Hello Swaddle',
  contentType: 'text',
  timestamp: new Date().toISOString(),
}

describe('chatSlice', () => {
  it('should return initial state', () => {
    expect(chatReducer(undefined, { type: '' })).toEqual(initialState)
  })

  it('should add a message', () => {
    const state = chatReducer(initialState, addMessage(mockMessage))
    expect(state.messages).toHaveLength(1)
    expect(state.messages[0].content).toBe('Hello Swaddle')
  })

  it('should set loading to true', () => {
    const state = chatReducer(initialState, setLoading(true))
    expect(state.isLoading).toBe(true)
  })

  it('should set error message', () => {
    const state = chatReducer(initialState, setError('Something went wrong'))
    expect(state.error).toBe('Something went wrong')
  })

  it('should clear messages', () => {
    const stateWithMessages = chatReducer(initialState, addMessage(mockMessage))
    const clearedState = chatReducer(stateWithMessages, clearMessages())
    expect(clearedState.messages).toHaveLength(0)
    expect(clearedState.error).toBeNull()
  })
})
