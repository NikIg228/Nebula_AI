"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { VoiceButton, type VoiceButtonState } from "@/components/VoiceButton";
import { audioToText } from "@/lib/audioToText";

const MAX_DURATION_MS = 60_000;

type VoiceRecorderProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  className?: string;
};

export function VoiceRecorder({
  onTranscript,
  disabled = false,
  className,
}: VoiceRecorderProps) {
  const [state, setState] = useState<VoiceButtonState>("idle");
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanup = useCallback(() => {
    mediaRecorderRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    chunksRef.current = [];
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current) {
      return;
    }
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    if (mediaRecorderRef.current.state === "inactive") {
      return;
    }
    mediaRecorderRef.current.stop();
  }, []);

  const handleTranscription = useCallback(
    async (audioBlob: Blob) => {
      setState("processing");
      try {
        const text = await audioToText(audioBlob);
        if (text) {
          setTranscript(text);
          onTranscript(text);
          toast.success("Текст распознан — можно отредактировать перед отправкой");
        } else {
          toast.info("Речь не распознана, попробуйте снова");
        }
      } catch (error) {
        console.error("Transcription failed", error);
        toast.error("Не удалось распознать речь. Попробуйте ещё раз.");
      } finally {
        cleanup();
        setState("idle");
      }
    },
    [cleanup, onTranscript]
  );

  const startRecording = useCallback(async () => {
    if (disabled) return;
    if (state !== "idle") return;

    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Браузер не поддерживает запись. Попробуйте новый браузер.");
      return;
    }

    try {
      setTranscript("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "";

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      });
      recorder.addEventListener("stop", () => {
        if (!chunksRef.current.length) {
          cleanup();
          setState("idle");
          toast.info("Нет записанных данных. Попробуйте ещё раз.");
          return;
        }
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        chunksRef.current = [];
        handleTranscription(blob);
      });

      recorder.start();
      setState("recording");

      toast.message("Запись началась", {
        description: "Отпустите кнопку, чтобы закончить. Макс. 60 секунд.",
      });

      stopTimeoutRef.current = setTimeout(() => {
        toast.info("Достигнут лимит записи (60 сек).");
        stopRecording();
      }, MAX_DURATION_MS);
    } catch (error) {
      console.error("startRecording error", error);
      toast.error(
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Доступ к микрофону запрещён. Разрешите доступ и попробуйте снова."
          : "Не удалось начать запись. Проверьте микрофон."
      );
      cleanup();
      setState("idle");
    }
  }, [cleanup, disabled, handleTranscription, state, stopRecording]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <>
      <VoiceButton
        state={state}
        className={className}
        disabled={disabled || state === "processing"}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={stopRecording}
        onTouchStart={() => {
          startRecording();
        }}
        onTouchEnd={stopRecording}
      />
      <span className="sr-only" aria-live="polite">
        {state === "recording"
          ? "Идёт запись голосового сообщения"
          : state === "processing"
            ? "Обработка аудио"
            : transcript
              ? `Распознанный текст: ${transcript}`
              : ""}
      </span>
    </>
  );
}

