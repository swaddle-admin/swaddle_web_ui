// Who sent the message
export type MessageRole = "user" | "assistant";

// The different types of content the AI can render
export type MessageContentType =
  | "text"
  | "card"
  | "action_buttons"
  | "tags"
  | "confirm";

// A single message in the chat
export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  contentType: MessageContentType;
  timestamp: Date;
  isLoading?: boolean;
}

// The overall chat state for Redux
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// UI state for Redux (dark mode etc)
export interface UIState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
}
