export type ChatRole = "user" | "assistant" | "system";

export type ChatModel = "gpt-4o" | "claude-3" | "grok-beta";

export type ChatMode = "agent" | "fast" | "research";

export type TonePreset = "friendly" | "formal" | "casual";

export type InterfaceAccent = "violet" | "blue" | "emerald";

export type ChatFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  pages?: number;
  content?: string;
};

export type ChatMessage = {
  id: string;
  sessionId: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  files?: ChatFile[];
  error?: string | null;
  streaming?: boolean;
};

export type ChatSession = {
  id: string;
  title: string;
  model: ChatModel;
  mode: ChatMode;
  createdAt: string;
  updatedAt: string;
  summary?: string;
  pinned?: boolean;
  archived?: boolean;
  folderId?: string | null;
};

export type ChatFolder = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatSettings = {
  model: ChatModel;
  mode: ChatMode;
  tone: TonePreset;
  accent: InterfaceAccent;
  language: "ru" | "en";
  memoryEnabled: boolean;
};

export type ChatCompletionPayload = {
  messages: Array<{ role: ChatRole; content: string }>;
  model: ChatModel;
  mode: ChatMode;
  files?: ChatFile[];
};

