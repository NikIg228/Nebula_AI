import { Metadata } from "next";
import { ChatApp } from "@/components/chat/ChatApp";

export const metadata: Metadata = {
  title: "Чат Nebula AI",
  description:
    "Общайтесь с AI-ассистентом Nebula, обсуждайте файлы и сохраняйте историю в Supabase.",
};

export default function ChatPage() {
  return <ChatApp />;
}

