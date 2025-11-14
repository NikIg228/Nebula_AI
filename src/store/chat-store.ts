"use client";

import { create } from "zustand";
import { v4 as uuid } from "uuid";
import {
  type ChatMessage,
  type ChatSession,
  type ChatSettings,
  type ChatMode,
  type ChatModel,
  type TonePreset,
  type InterfaceAccent,
} from "@/types/chat";

type ChatStoreState = {
  sessions: ChatSession[];
  messages: Record<string, ChatMessage[]>;
  activeSessionId: string | null;
  isLoading: boolean;
  isSettingsOpen: boolean;
  settings: ChatSettings;
};

type ChatStoreActions = {
  createSession: (title?: string) => string;
  removeSession: (sessionId: string) => void;
  selectSession: (sessionId: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  updateMessage: (
    sessionId: string,
    messageId: string,
    patch: Partial<ChatMessage> | ((message: ChatMessage) => Partial<ChatMessage>)
  ) => void;
  removeMessage: (sessionId: string, messageId: string) => void;
  renameSession: (sessionId: string, title: string) => void;
  setLoading: (value: boolean) => void;
  setSettingsOpen: (value: boolean) => void;
  updateSettings: (patch: Partial<ChatSettings>) => void;
  replaceSessions: (sessions: ChatSession[]) => void;
  hydrateSessionMessages: (sessionId: string, messages: ChatMessage[]) => void;
};

const defaultSettings: ChatSettings = {
  model: "gpt-4o",
  mode: "explore",
  tone: "friendly",
  accent: "violet",
  language: "ru",
  memoryEnabled: true,
};

const createDraftSession = (title?: string): ChatSession => {
  const id = uuid();
  const timestamp = new Date().toISOString();
  return {
    id,
    title: title ?? "Новый диалог",
    model: defaultSettings.model,
    mode: defaultSettings.mode,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

const initialSession = createDraftSession("Первый диалог с Nebula");

export const useChatStore = create<ChatStoreState & ChatStoreActions>()(
  (set) => ({
    sessions: [initialSession],
    messages: {},
    activeSessionId: initialSession.id,
    isLoading: false,
    isSettingsOpen: false,
    settings: defaultSettings,

    createSession: (title) => {
      const session = createDraftSession(title);
      set((state) => ({
        sessions: [session, ...state.sessions],
        activeSessionId: session.id,
      }));
      return session.id;
    },

    removeSession: (sessionId) => {
      set((state) => {
        const sessions = state.sessions.filter((session) => session.id !== sessionId);
        const restMessages = { ...state.messages };
        delete restMessages[sessionId];
        const activeSessionId =
          state.activeSessionId === sessionId ? sessions.at(0)?.id ?? null : state.activeSessionId;
        return {
          sessions,
          messages: restMessages,
          activeSessionId,
        };
      });
    },

    selectSession: (sessionId) => {
      set({ activeSessionId: sessionId });
    },

    addMessage: (sessionId, message) => {
      set((state) => ({
        messages: {
          ...state.messages,
          [sessionId]: [...(state.messages[sessionId] ?? []), message],
        },
        sessions: state.sessions.map((session) =>
          session.id === sessionId
            ? { ...session, updatedAt: new Date().toISOString() }
            : session
        ),
      }));
    },

    updateMessage: (sessionId, messageId, patch) => {
      set((state) => ({
        messages: {
          ...state.messages,
          [sessionId]: (state.messages[sessionId] ?? []).map((message) =>
            message.id === messageId
              ? {
                  ...message,
                  ...(typeof patch === "function" ? patch(message) : patch),
                }
              : message
          ),
        },
      }));
    },

    removeMessage: (sessionId, messageId) => {
      set((state) => ({
        messages: {
          ...state.messages,
          [sessionId]: (state.messages[sessionId] ?? []).filter(
            (message) => message.id !== messageId
          ),
        },
      }));
    },

    renameSession: (sessionId, title) => {
      set((state) => ({
        sessions: state.sessions.map((session) =>
          session.id === sessionId ? { ...session, title } : session
        ),
      }));
    },

    setLoading: (value) => set({ isLoading: value }),

    setSettingsOpen: (value) => set({ isSettingsOpen: value }),

    updateSettings: (patch) =>
      set((state) => ({
        settings: {
          ...state.settings,
          ...patch,
        },
      })),

    replaceSessions: (sessions) => set({ sessions }),

    hydrateSessionMessages: (sessionId, messages) =>
      set((state) => ({
        messages: {
          ...state.messages,
          [sessionId]: messages,
        },
      })),
  })
);

export const selectActiveSession = (state: ChatStoreState) =>
  state.sessions.find((session) => session.id === state.activeSessionId) ?? state.sessions[0];

export const selectSessionMessages = (sessionId: string | null) => {
  const { messages } = useChatStore.getState();
  if (!sessionId) {
    return [];
  }
  return messages[sessionId] ?? [];
};

export const selectModel = () => useChatStore.getState().settings.model;
export const selectMode = () => useChatStore.getState().settings.mode;
export const selectTone = () => useChatStore.getState().settings.tone;
export const selectAccent = () => useChatStore.getState().settings.accent;
export const selectLanguage = () => useChatStore.getState().settings.language;

export const updateModel = (model: ChatModel) =>
  useChatStore.getState().updateSettings({ model });
export const updateMode = (mode: ChatMode) =>
  useChatStore.getState().updateSettings({ mode });
export const updateTone = (tone: TonePreset) =>
  useChatStore.getState().updateSettings({ tone });
export const updateAccent = (accent: InterfaceAccent) =>
  useChatStore.getState().updateSettings({ accent });

