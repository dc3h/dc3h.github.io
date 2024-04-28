import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { createSettingSlice, SettingSlice } from './slice/settingSlice';
import { createChatSlice, ChatSlice } from './slice/chatSlice';

export const useBoundStore = create<SettingSlice & ChatSlice>()(
  persist(
    (...a) => ({
      ...createSettingSlice(...a),
      ...createChatSlice(...a),
      // Here you could include other slices if you have any
    }),
    {
      name: 'boundStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
