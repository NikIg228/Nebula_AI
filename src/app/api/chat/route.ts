import { createLLMStream } from "@/lib/openai-client";
import { ChatCompletionPayload } from "@/types/chat";

export const runtime = "edge";
export const preferredRegion = "fra1";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ChatCompletionPayload;
    const stream = await createLLMStream(payload);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка сервера";
    return new Response(
      JSON.stringify({
        error: message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

