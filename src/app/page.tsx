import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { CallToAction } from "@/components/marketing/cta";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col">
          <Hero />
          <div id="features">
            <Features />
          </div>
          <Pricing />
          <div id="faq">
            <FAQ />
          </div>
          <CallToAction />
        </main>
        <footer className="relative border-t border-[#8A2FFF]/20 bg-[#0B0B0D]/60 backdrop-blur-md py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-foreground">
                Nebula AI © {new Date().getFullYear()}
              </p>
              <p className="text-xs text-muted-foreground">
              Всё, что нужно для
              профессиональной работы с документами
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a 
                className="transition-colors text-muted-foreground hover:text-[#C084FC]" 
                href="/pricing"
              >
                Тарифы
              </a>
              <a 
                className="transition-colors text-muted-foreground hover:text-[#C084FC]" 
                href="/about"
              >
                О сервисе
              </a>
              <a 
                className="transition-colors text-muted-foreground hover:text-[#C084FC]" 
                href="/#faq"
              >
                FAQ
              </a>
              <a 
                className="transition-colors text-muted-foreground hover:text-[#C084FC]" 
                href="/policies"
              >
                Условия и Политики
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
