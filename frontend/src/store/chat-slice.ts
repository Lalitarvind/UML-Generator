import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export type MessageRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
};

type ChatState = {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<{ role: MessageRole; content: string }>) {
      state.messages.push({
        id: nanoid(),
        role: action.payload.role,
        content: action.payload.content,
        timestamp: Date.now(),
      });
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearHistory(state) {
      state.messages = [];
      state.error = null;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
