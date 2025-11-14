"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "sonner";

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: {
    new (): SpeechRecognition;
  };
  webkitSpeechRecognition?: {
    new (): SpeechRecognition;
  };
}

type SpeechRecognitionHook = {
  isListening: boolean;
  transcript: string;
  hasSpeech: boolean;
  startListening: () => void;
  stopListening: () => void;
  supported: boolean;
};

export function useSpeechRecognition(
  onResult?: (transcript: string) => void
): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasSpeech, setHasSpeech] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const supported = useMemo(() => {
    if (typeof window === "undefined") return false;
    const win = window as WindowWithSpeechRecognition;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  }, []);

  useEffect(() => {
    if (!supported || typeof window === "undefined") return;

    const win = window as WindowWithSpeechRecognition;
    const SpeechRecognition =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ru-RU";

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      setHasSpeech(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const alt = result[0];
        if (alt && alt.transcript) {
          if (result.isFinal) {
            finalTranscript += alt.transcript + " ";
          } else {
            interimTranscript += alt.transcript;
          }
        }
      }

      const fullTranscript = finalTranscript || interimTranscript;
      const trimmedTranscript = fullTranscript.trim();
      setTranscript(trimmedTranscript);
      setHasSpeech(trimmedTranscript.length > 0);
      
      if (finalTranscript && onResult) {
        onResult(finalTranscript.trim());
      } else if (interimTranscript && onResult) {
        // Также вызываем callback для промежуточных результатов
        onResult(trimmedTranscript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      if (event.error === "not-allowed") {
        toast.error("Доступ к микрофону запрещён. Разрешите доступ в настройках браузера.");
      } else if (event.error === "no-speech") {
        toast.error("Речь не распознана. Попробуйте ещё раз.");
      } else {
        toast.error("Ошибка распознавания речи");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setHasSpeech(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [supported, onResult]);

  const startListening = () => {
    if (!supported || !recognitionRef.current) {
      toast.error("Голосовой ввод не поддерживается в вашем браузере");
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast.error("Не удалось начать запись");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return {
    isListening,
    transcript,
    hasSpeech,
    startListening,
    stopListening,
    supported,
  };
}

