import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatState, Message, MessageContentType } from '../../types'

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearMessages: (state) => {
      state.messages = []
      state.error = null
    },
    updateMessage: (
      state,
      action: PayloadAction<{
        id: string
        content: string
        contentType?: MessageContentType
      }>
    ) => {
      const message = state.messages.find((m) => m.id === action.payload.id)
      if (message) {
        message.content = action.payload.content
        if (action.payload.contentType) {
          message.contentType = action.payload.contentType
        }
      }
    },
  },
})

export const {
  addMessage,
  setLoading,
  setError,
  clearMessages,
  updateMessage,
} = chatSlice.actions
export default chatSlice.reducer
