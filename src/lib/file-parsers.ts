import { v4 as uuid } from "uuid";
import Papa from "papaparse";
import { ChatFile } from "@/types/chat";

const SUPPORTED_TYPES = [
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/webp",
];

async function readFileAsText(file: File): Promise<string> {
  if (file.type.startsWith("text/") || file.name.endsWith(".txt")) {
    return file.text();
  }

  if (file.type === "text/csv" || file.name.endsWith(".csv")) {
    const text = await file.text();
    const parsed = Papa.parse<string[]>(text);
    return parsed.data
      .map((row) => row.filter(Boolean).join(" • "))
      .filter(Boolean)
      .join("\n");
  }

  if (file.type.startsWith("image/")) {
    return "[Изображение будет обработано на сервере]";
  }

  if (file.type === "application/pdf") {
    return "[PDF будет конвертирован в текст на сервере]";
  }

  if (file.name.endsWith(".docx")) {
    return "[Документ Word будет обработан на сервере]";
  }

  return "";
}

export async function parseFiles(files: File[]): Promise<ChatFile[]> {
  const unsupported = files.filter(
    (file) =>
      !SUPPORTED_TYPES.includes(file.type) &&
      !file.name.match(/\.(txt|csv|docx)$/i)
  );

  if (unsupported.length > 0) {
    throw new Error(
      `Некоторые файлы не поддерживаются: ${unsupported
        .map((file) => file.name)
        .join(", ")}`
    );
  }

  return Promise.all(
    files.map(async (file) => ({
      id: uuid(),
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      content: await readFileAsText(file),
    }))
  );
}

