import { StateCreator } from 'zustand';

export interface SettingSlice {
  language: string;
  sessionId: string;
  userId: string;
  jobDescription: string;
  setLanguage: (language: string) => void;
  setJobDescription: (jobDescription: string) => void;
  setSessionId: (sessionId: string) => void;
  setUserId: (userId: string) => void;
}

export const createSettingSlice: StateCreator<
  SettingSlice,
  [],
  [],
  SettingSlice
> = set => ({
  language: 'EN',
  jobDescription: "",
  sessionId: '',
  userId: '',
  setLanguage: (language: string) => {
    set(state => {
      state.language = language;
      return {
        language: language,
      };
    });
  },
  setJobDescription: (jobDescription: string) => {
    set(state => {
      state.jobDescription = jobDescription;
      return {
        jobDescription: jobDescription,
      };
    });
  },
  setSessionId: (sessionId: string) => {
    set(state => {
      state.sessionId = sessionId;
      return {
        sessionId: sessionId,
      };
    });
  },
  setUserId: (userId: string) => {
    set(state => {
      state.userId = userId;
      return {
        userId: userId,
      };
    });
  }
});
