import { StateCreator } from 'zustand';

interface Message {
  role: string;
  content: string;
}

export interface ChatSlice {
  conversation: Message[];
  chat: (role: string, content: string) => void;
}

export const createChatSlice: StateCreator<
  ChatSlice,
  [],
  [],
  ChatSlice
> = set => ({
  conversation: [],
    chat: async (role: string, content: string) => {
        set(state => {
            state.conversation.push({
                role: role,
                content: content
            });
            return {
              conversation: state.conversation,
            };
        });
    }
});
