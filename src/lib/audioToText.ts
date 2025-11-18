export async function audioToText(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("file", audioBlob, "voice-input.webm");
  formData.append("language", "ru");

  const response = await fetch("/api/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Сервер вернул ошибку распознавания";
    try {
      const errorBody = await response.json();
      message =
        (errorBody as { error?: string }).error ??
        JSON.stringify(errorBody, null, 2);
    } catch {
      message = await response.text();
    }
    throw new Error(message || "Сервер вернул ошибку распознавания");
  }

  const data = (await response.json()) as { text?: string };
  const text = data.text?.trim();
  if (!text) {
    throw new Error("Сервис распознавания вернул пустой ответ");
  }
  return text;
}

