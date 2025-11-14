import { ChatCompletionPayload } from "@/types/chat";

const DEFAULT_SYSTEM_PROMPT =
  "Ты — Nebula AI, внимательный ассистент с краткой и точной подачей. Отвечай на русском.";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_BASE_URL =
  process.env.OPENROUTER_API_BASE_URL ?? "https://openrouter.ai/api/v1";
const OPENROUTER_SITE_URL =
  process.env.OPENROUTER_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const OPENROUTER_APP_TITLE = process.env.OPENROUTER_APP_TITLE ?? "Nebula AI";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_BASE_URL =
  process.env.OPENAI_API_BASE_URL ?? "https://api.openai.com/v1";

const MODEL_MAP_OPENROUTER: Record<string, string> = {
  "gpt-4o": "openai/gpt-4o",
  "claude-3": "anthropic/claude-3.5-sonnet",
  "grok-beta": "xai/grok-beta",
};

function resolveModel(model: string) {
  if (OPENROUTER_API_KEY) {
    return MODEL_MAP_OPENROUTER[model] ?? model;
  }
  return model;
}

function buildMessages(payload: ChatCompletionPayload) {
  const systemMessage = {
    role: "system" as const,
    content: DEFAULT_SYSTEM_PROMPT,
  };
  return [systemMessage, ...payload.messages];
}

function createFallbackStream(payload: ChatCompletionPayload) {
  const encoder = new TextEncoder();
  const greeting =
    payload.mode === "fast"
      ? "Готов ответить быстро и по делу."
      : payload.mode === "learn"
      ? "Давайте разберём вопрос шаг за шагом и закрепим знания."
      : "Исследуем тему подробно, анализируя детали и контекст.";

  const segments = [
    `Привет! Я Nebula, ваш AI-ассистент. ${greeting}`,
    "Поддерживаю загрузку файлов, память последних сообщений и переключение режимов общения.",
    "Расскажите, чем могу помочь прямо сейчас?",
  ];

  return new ReadableStream({
    start(controller) {
      segments.forEach((segment, index) => {
        setTimeout(() => {
          controller.enqueue(encoder.encode(`data: ${segment}\n\n`));
          if (index === segments.length - 1) {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          }
        }, index * 400);
      });
    },
  });
}

export async function createLLMStream(payload: ChatCompletionPayload) {
  const useOpenRouter = Boolean(OPENROUTER_API_KEY);
  const apiKey = useOpenRouter ? OPENROUTER_API_KEY : OPENAI_API_KEY;
  const apiBase = useOpenRouter ? OPENROUTER_API_BASE_URL : OPENAI_API_BASE_URL;

  if (!apiKey) {
    return createFallbackStream(payload);
  }

  try {
    const response = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...(useOpenRouter
          ? {
              "HTTP-Referer": OPENROUTER_SITE_URL,
              "X-Title": OPENROUTER_APP_TITLE,
            }
          : {}),
      },
      body: JSON.stringify({
        model: resolveModel(payload.model),
        stream: true,
        messages: buildMessages(payload),
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(
        `${useOpenRouter ? "OpenRouter" : "OpenAI"} API вернул ошибку: ${
          response.status
        } ${response.statusText}`
      );
    }

    return response.body;
  } catch (error) {
    console.error(
      `Ошибка при обращении к ${useOpenRouter ? "OpenRouter" : "OpenAI"} API`,
      error
    );
    return createFallbackStream(payload);
  }
}

