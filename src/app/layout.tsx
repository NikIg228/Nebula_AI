import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import DarkVeil from "@/components/DarkVeil";
import { GlobalHeader } from "@/components/layout/global-header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nebula AI — персональный ассистент нового поколения",
  description:
    "Создайте собственный AI-ассистент с памятью, загрузкой файлов и продвинутым управлением контекстом.",
  metadataBase: new URL("https://nebula-ai.app"),
  icons: [
    { rel: "icon", url: "/logo.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/logo.png" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} min-h-screen font-sans antialiased relative`}
      >
        <div className="fixed inset-0 z-0" style={{ width: '100vw', height: '100vh' }}>
          <DarkVeil />
        </div>
        <AppProviders>
          <div className="relative z-10 flex min-h-screen flex-col">
            <GlobalHeader />
            <div className="flex-1">{children}</div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
