import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatState, Message } from "../../types";

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
  },
});

export const { addMessage, setLoading, setError, clearMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
