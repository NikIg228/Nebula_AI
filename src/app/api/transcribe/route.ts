import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_BASE_URL =
  process.env.OPENAI_API_BASE_URL ?? "https://api.openai.com/v1";
const TRANSCRIBE_MODEL =
  process.env.OPENAI_TRANSCRIBE_MODEL ?? "gpt-4o-mini-transcribe";
const TRANSCRIBE_LANGUAGE =
  process.env.OPENAI_TRANSCRIBE_LANGUAGE ?? "ru";
const TRANSCRIBE_PROMPT =
  process.env.OPENAI_TRANSCRIBE_PROMPT ??
  "Расставь корректную пунктуацию, сохраняй регистр и возвращай литературный русский текст без лишних комментариев.";

export async function POST(request: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Не задан OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }

  const openAIFormData = new FormData();
  const fileName =
    (file as File).name?.trim() ||
    `voice-input-${Date.now()}.${(file as File).type.split("/")[1] ?? "webm"}`;

  openAIFormData.append("file", file, fileName);
  openAIFormData.append("model", TRANSCRIBE_MODEL);
  openAIFormData.append("response_format", "json");
  openAIFormData.append("temperature", "0");
  openAIFormData.append("language", TRANSCRIBE_LANGUAGE);
  if (TRANSCRIBE_PROMPT) {
    openAIFormData.append("prompt", TRANSCRIBE_PROMPT);
  }

  try {
    const response = await fetch(`${OPENAI_API_BASE_URL}/audio/transcriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: openAIFormData,
    });

    if (!response.ok) {
      let errorMessage = "Неизвестная ошибка";
      try {
        const errorJson = await response.json();
        errorMessage =
          (errorJson as { error?: { message?: string; type?: string } }).error
            ?.message ?? JSON.stringify(errorJson);
      } catch {
        errorMessage = await response.text();
      }
      console.error("OpenAI transcription error", response.status, errorMessage);
      return NextResponse.json(
        { error: `OpenAI не смог распознать аудио: ${errorMessage}` },
        { status: 502 }
      );
    }

    const data = (await response.json()) as { text?: string };
    return NextResponse.json({
      text: data.text?.trim() ?? "",
    });
  } catch (error) {
    console.error("Transcription request failed", error);
    return NextResponse.json(
      { error: "Не удалось связаться с сервисом распознавания" },
      { status: 500 }
    );
  }
}

