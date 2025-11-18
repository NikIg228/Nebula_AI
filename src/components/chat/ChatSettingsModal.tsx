"use client";

import {
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import {
  Bell,
  CalendarClock,
  Database,
  PlugZap,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PreferencesState = {
  appearance: "system" | "light" | "dark";
  accent: "default" | "violet" | "emerald" | "amber";
  language: "ru" | "en";
  conversationLanguage: "auto" | "ru" | "en";
  voice: "arbor" | "sol";
  voiceAutoplay: boolean;
  showAdvancedModels: boolean;
  notifications: {
    responses: "push" | "email" | "off";
    tasks: "push_email" | "email" | "off";
    projects: "email" | "off";
    recommendations: "push_email" | "off";
  };
  personalization: {
    style: "default" | "friendly" | "formal";
    nickname: string;
    profession: string;
    about: string;
    memoryLink: boolean;
    historyReference: boolean;
  };
  dataControls: {
    improveModel: boolean;
    remoteBrowser: boolean;
  };
  security: {
    twoFactor: boolean;
    loginAlerts: boolean;
  };
  parentalControl: boolean;
};

const initialPreferences: PreferencesState = {
  appearance: "system",
  accent: "default",
  language: "ru",
  conversationLanguage: "auto",
  voice: "arbor",
  voiceAutoplay: true,
  showAdvancedModels: true,
  notifications: {
    responses: "push",
    tasks: "push_email",
    projects: "email",
    recommendations: "push_email",
  },
  personalization: {
    style: "default",
    nickname: "",
    profession: "",
    about: "",
    memoryLink: true,
    historyReference: true,
  },
  dataControls: {
    improveModel: true,
    remoteBrowser: true,
  },
  security: {
    twoFactor: true,
    loginAlerts: true,
  },
  parentalControl: false,
};

type SectionConfig = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function ChatSettingsModal() {
  const isSettingsOpen = useChatStore((state) => state.isSettingsOpen);
  const setSettingsOpen = useChatStore((state) => state.setSettingsOpen);

  const [preferences, setPreferences] = useState<PreferencesState>(initialPreferences);
  const [activeSection, setActiveSection] = useState("general");

  const handleOpenChange = (open: boolean) => {
    setSettingsOpen(open);
    if (open) {
      setActiveSection("general");
    }
  };

  const sections: SectionConfig[] = useMemo(
    () => [
      { id: "general", label: "Общее", icon: Settings2 },
      { id: "notifications", label: "Уведомления", icon: Bell },
      { id: "personalization", label: "Персонализация", icon: Sparkles },
      { id: "integrations", label: "Приложения и подключения", icon: PlugZap },
      { id: "schedules", label: "Расписания", icon: CalendarClock },
      { id: "data", label: "Элементы управления данными", icon: Database },
      { id: "security", label: "Безопасность", icon: ShieldCheck },
      { id: "parental", label: "Родительский контроль", icon: Users },
      { id: "account", label: "Учётная запись", icon: UserRound },
    ],
    []
  );

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-5">
            <SectionCard title="Общие настройки">
              <SettingRow
                label="Внешний вид"
                description="Система автоматически подстроит тему под OS."
              >
                <Select
                  value={preferences.appearance}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, appearance: value as PreferencesState["appearance"] }))
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Система" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">Система</SelectItem>
                    <SelectItem value="light">Светлая</SelectItem>
                    <SelectItem value="dark">Тёмная</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow label="Акцентный цвет" description="Используйте фирменный цвет или выберите другой.">
                <Select
                  value={preferences.accent}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, accent: value as PreferencesState["accent"] }))
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="По умолчанию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">По умолчанию</SelectItem>
                    <SelectItem value="violet">Фиолетовый</SelectItem>
                    <SelectItem value="emerald">Изумрудный</SelectItem>
                    <SelectItem value="amber">Янтарный</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow label="Язык интерфейса" description="Выберите язык, на котором удобнее работать.">
                <Select
                  value={preferences.language}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, language: value as PreferencesState["language"] }))
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="русский" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow
                label="Разговорный язык"
                description="Автоматическое определение помогает, если вы используете несколько языков."
              >
                <Select
                  value={preferences.conversationLanguage}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({
                      ...prev,
                      conversationLanguage: value as PreferencesState["conversationLanguage"],
                    }))
                  }
                >
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Автоматически" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Автоматически определять</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">Английский</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow label="Голос" description="Выберите голос и прослушайте пример.">
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    ▶ Воспроизвести
                  </Button>
                  <Select
                    value={preferences.voice}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, voice: value as PreferencesState["voice"] }))
                    }
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Arbor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arbor">Arbor</SelectItem>
                      <SelectItem value="sol">Sol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </SettingRow>
              <SettingRow
                label="Автозапуск голосового чата"
                description="Автоматически включать микрофон при входе в голосовой режим."
              >
                <Switch
                  checked={preferences.voiceAutoplay}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, voiceAutoplay: checked }))
                  }
                />
              </SettingRow>
              <SettingRow
                label="Показывать дополнительные модели"
                description="Отображать экспериментальные модели Nebula / OpenRouter."
              >
                <Switch
                  checked={preferences.showAdvancedModels}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, showAdvancedModels: checked }))
                  }
                />
              </SettingRow>
            </SectionCard>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-5">
            <SectionCard title="Настройки уведомлений">
              <SettingRow
                label="Ответы"
                description="Получайте уведомления, когда ответ требует времени (исследования, генерация)."
              >
                <Select
                  value={preferences.notifications.responses}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, responses: value as PreferencesState["notifications"]["responses"] },
                    }))
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Push" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="push">Push-уведомления</SelectItem>
                    <SelectItem value="email">Электронная почта</SelectItem>
                    <SelectItem value="off">Выключено</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow
                label="Задачи"
                description="Уведомления, когда задачи обновляются."
              >
                <Select
                  value={preferences.notifications.tasks}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, tasks: value as PreferencesState["notifications"]["tasks"] },
                    }))
                  }
                >
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Push и почта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="push_email">Push-уведомления, электронная почта</SelectItem>
                    <SelectItem value="email">Только электронная почта</SelectItem>
                    <SelectItem value="off">Выключено</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow
                label="Projects"
                description="Письмо придёт, если вас пригласят в общий проект."
              >
                <Select
                  value={preferences.notifications.projects}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, projects: value as PreferencesState["notifications"]["projects"] },
                    }))
                  }
                >
                  <SelectTrigger className="w-52">
                    <SelectValue placeholder="Электронная почта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Электронная почта</SelectItem>
                    <SelectItem value="off">Выключено</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <SettingRow
                label="Рекомендации"
                description="Новости и советы по Nebula."
              >
                <Select
                  value={preferences.notifications.recommendations}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, recommendations: value as PreferencesState["notifications"]["recommendations"] },
                    }))
                  }
                >
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Push и почта" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="push_email">Push-уведомления, электронная почта</SelectItem>
                    <SelectItem value="off">Выключено</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </SectionCard>
          </div>
        );
      case "personalization":
        return (
          <div className="space-y-5">
            <SectionCard
              title="Персонализация"
              description="Настройте стиль ответов и то, что Nebula должна помнить."
            >
              <SettingRow label="Базовый стиль и тон">
                <Select
                  value={preferences.personalization.style}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({
                      ...prev,
                      personalization: { ...prev.personalization, style: value as PreferencesState["personalization"]["style"] },
                    }))
                  }
                >
                  <SelectTrigger className="w-52">
                    <SelectValue placeholder="По умолчанию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">По умолчанию</SelectItem>
                    <SelectItem value="friendly">Дружелюбный</SelectItem>
                    <SelectItem value="formal">Официальный</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Пользовательские инструкции</p>
                  <Textarea
                    placeholder="Дополнительные предпочтения в поведении, стиле и тоне"
                    value={preferences.personalization.about}
                    onChange={(event) =>
                      setPreferences((prev) => ({
                        ...prev,
                        personalization: { ...prev.personalization, about: event.target.value },
                      }))
                    }
                    className="mt-2"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Псевдоним"
                    value={preferences.personalization.nickname}
                    onChange={(event) =>
                      setPreferences((prev) => ({
                        ...prev,
                        personalization: { ...prev.personalization, nickname: event.target.value },
                      }))
                    }
                  />
                  <Input
                    placeholder="Профессия"
                    value={preferences.personalization.profession}
                    onChange={(event) =>
                      setPreferences((prev) => ({
                        ...prev,
                        personalization: { ...prev.personalization, profession: event.target.value },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <ToggleRow
                  label="Ссылка на сохранённую память"
                  description="Позволяет Nebula сохранять и использовать память при ответах."
                  checked={preferences.personalization.memoryLink}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      personalization: { ...prev.personalization, memoryLink: checked },
                    }))
                  }
                />
                <ToggleRow
                  label="Ссылаться на историю чата"
                  description="Позволяет Nebula учитывать предыдущее обсуждение."
                  checked={preferences.personalization.historyReference}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      personalization: { ...prev.personalization, historyReference: checked },
                    }))
                  }
                />
              </div>
            </SectionCard>
          </div>
        );
      case "integrations":
        return (
          <SectionCard
            title="Приложения и подключения"
            description="Управляйте связанными сервисами и API-ключами."
          >
            <IntegrationRow
              title="OpenAI / Whisper / OpenRouter"
              description="Подключите ключи, чтобы использовать внешние модели и распознавание речи."
            />
            <IntegrationRow
              title="Google Drive"
              description="Импортируйте документы напрямую из облака (скоро)."
              disabled
            />
            <IntegrationRow
              title="Notion"
              description="Синхронизируйте базы знаний. Поддержка появится позже."
              disabled
            />
          </SectionCard>
        );
      case "schedules":
        return (
          <SectionCard
            title="Расписания"
            description="Планируйте автоматические действия. Пока доступно только для внутренних пользователей Nebula."
          >
            <p className="text-sm text-muted-foreground">
              Здесь появятся напоминания, автозапуски исследований и расписания публикаций. Прямо сейчас модуль
              находится в стадии разработки.
            </p>
            <Button className="mt-4 w-fit" variant="outline">
              Сообщить, когда будет готово
            </Button>
          </SectionCard>
        );
      case "data":
        return (
          <SectionCard title="Элементы управления данными">
            <ToggleRow
              label="Улучшить модель для всех"
              description="Анонимизированные чаты помогут обучать модель."
              checked={preferences.dataControls.improveModel}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  dataControls: { ...prev.dataControls, improveModel: checked },
                }))
              }
            />
            <ToggleRow
              label="Данные удалённого браузера"
              description="Делиться ли данными, полученными в облачном браузере."
              checked={preferences.dataControls.remoteBrowser}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  dataControls: { ...prev.dataControls, remoteBrowser: checked },
                }))
              }
            />
            <div className="grid gap-3 md:grid-cols-2 mt-4">
              <DataAction label="Общие ссылки" actionLabel="Управление" />
              <DataAction label="Архивированные чаты" actionLabel="Управление" />
              <DataAction label="Архивировать все чаты" actionLabel="Архивировать" />
              <DataAction label="Удалить все чаты" actionLabel="Удалить" destructive />
              <DataAction label="Экспорт данных" actionLabel="Экспорт" />
            </div>
          </SectionCard>
        );
      case "security":
        return (
          <SectionCard title="Безопасность">
            <ToggleRow
              label="Двухфакторная аутентификация"
              description="Получайте одноразовые коды при входе."
              checked={preferences.security.twoFactor}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  security: { ...prev.security, twoFactor: checked },
                }))
              }
            />
            <ToggleRow
              label="Оповещения о входе"
              description="Nebula предупредит, если кто-то войдёт с нового устройства."
              checked={preferences.security.loginAlerts}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  security: { ...prev.security, loginAlerts: checked },
                }))
              }
            />
            <Button variant="outline" className="mt-4 w-fit">
              Управление паролями
            </Button>
          </SectionCard>
        );
      case "parental":
        return (
          <SectionCard title="Родительский контроль">
            <ToggleRow
              label="Включить родительский контроль"
              description="Ограничить доступ к экспериментальным функциям и контенту."
              checked={preferences.parentalControl}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, parentalControl: checked }))
              }
            />
            <p className="text-xs text-muted-foreground">
              Управление профилями детей и фильтрами появится позже. Мы сообщим, когда обновление будет готово.
            </p>
          </SectionCard>
        );
      case "account":
        return (
          <SectionCard
            title="Учётная запись"
            description="Информация о тарифе и профиле Nebula."
          >
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Nebula Plus</p>
                  <p className="text-xs text-muted-foreground">
                    План будет автоматически продлён 18 дек 2025 г.
                  </p>
                </div>
                <Button variant="outline">Управление</Button>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>Расширенные модели и глубинные исследования.</li>
                <li>Память и контекст без ограничений.</li>
                <li>Проекты, задачи и пользовательские GPT.</li>
              </ul>
            </div>
            <Button variant="ghost" className="justify-start">
              Удалить учётную запись
            </Button>
          </SectionCard>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[900px] min-w-[900px] max-w-[900px] h-[80vh] flex flex-col rounded-[24px] px-6 py-6 bg-[#08070C]/95 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden">
        <DialogHeader className="pb-2 border-b border-white/10">
          <div className="pt-2 pb-4">
            <DialogTitle className="text-xl font-semibold text-white">Настройки</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
            Управляйте Nebula AI легко и удобно: настройте язык, уведомления, данные и безопасность.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden pt-4">
          <div className="flex h-full flex-col md:flex-row gap-6 overflow-hidden">
            <nav className="settings-scroll w-full md:w-[260px] min-w-[260px] flex-shrink-0 overflow-y-auto overflow-x-hidden bg-transparent whitespace-nowrap md:mr-6">
              <ul className="flex md:flex-col gap-2 py-2 pr-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = section.id === activeSection;
                return (
                  <li key={section.id} className="flex-1 md:flex-none">
                    <button
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-2xl px-4 py-2 text-sm transition-all whitespace-nowrap",
                        isActive
                          ? "bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                          : "text-muted-foreground hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{section.label}</span>
                    </button>
                  </li>
                );
              })}
              </ul>
            </nav>
            <div className="settings-scroll flex-1 min-w-[500px] max-w-[600px] overflow-y-auto overflow-x-hidden pr-1">
              <div className="mx-auto w-full space-y-6 whitespace-normal break-words">
                {renderSection()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/3 p-6 space-y-4 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
      <div className="max-w-md space-y-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description ? <p className="text-xs text-muted-foreground leading-relaxed">{description}</p> : null}
      </div>
      <div className="flex items-center justify-end">{children}</div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function IntegrationRow({
  title,
  description,
  disabled,
}: {
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline" size="sm" disabled={disabled}>
        {disabled ? "Скоро" : "Управление"}
      </Button>
    </div>
  );
}

function DataAction({
  label,
  actionLabel,
  destructive,
}: {
  label: string;
  actionLabel: string;
  destructive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-sm">
      <p>{label}</p>
      <Button variant={destructive ? "destructive" : "outline"} size="sm">
        {actionLabel}
      </Button>
    </div>
  );
}
