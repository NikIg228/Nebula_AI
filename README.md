# Nebula AI

Современная платформа для общения с AI-моделями, построенная на Next.js 16 с поддержкой Supabase, OpenAI и OpenRouter.

## 🚀 Возможности

- 💬 Чат с различными AI-моделями (GPT-4o, Claude 3, Grok)
- 📁 Загрузка и обработка файлов (PDF, DOCX, TXT, CSV, MD)
- 🧠 Контекстная память для диалогов
- 🎨 Современный UI с темной темой
- 🔐 Интеграция с Supabase для хранения данных
- 📱 Адаптивный дизайн для всех устройств

## 📋 Требования

- Node.js 20 или выше
- npm, yarn, pnpm или bun
- Аккаунт Supabase (для хранения данных)
- API ключ OpenAI или OpenRouter (для работы с AI-моделями)

## 🛠️ Установка

1. Клонируйте репозиторий:
```bash
git clone <your-repo-url>
cd nebula_ai
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
# или
pnpm install
```

3. Создайте файл `.env.local` в корне проекта:
```bash
# Supabase Configuration (обязательно)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration (опционально)
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE_URL=https://api.openai.com/v1

# OpenRouter Configuration (опционально, альтернатива OpenAI)
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_API_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_APP_TITLE=Nebula AI

# App URL (опционально)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Запустите сервер разработки:
```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📦 Скрипты

- `npm run dev` - Запуск сервера разработки
- `npm run build` - Сборка проекта для продакшена
- `npm run start` - Запуск продакшен сервера
- `npm run lint` - Проверка кода линтером

## 🚀 Деплой на Netlify

### Подготовка к деплою

1. Убедитесь, что все изменения закоммичены в Git:
```bash
git add .
git commit -m "Prepare for deployment"
```

2. Создайте репозиторий на GitHub (если еще не создан):
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Деплой через Netlify UI

1. Зайдите на [Netlify](https://www.netlify.com/) и войдите в аккаунт
2. Нажмите "Add new site" → "Import an existing project"
3. Подключите ваш GitHub репозиторий
4. Настройки сборки (должны определиться автоматически из `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Добавьте переменные окружения в разделе "Site settings" → "Environment variables":
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` (или `OPENROUTER_API_KEY`)
   - И другие необходимые переменные
6. Нажмите "Deploy site"

### Деплой через Netlify CLI

1. Установите Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Войдите в Netlify:
```bash
netlify login
```

3. Инициализируйте проект:
```bash
netlify init
```

4. Деплой:
```bash
netlify deploy --prod
```

### Настройка переменных окружения на Netlify

После создания сайта:

1. Перейдите в "Site settings" → "Environment variables"
2. Добавьте все необходимые переменные из `.env.local`
3. Убедитесь, что `OPENROUTER_SITE_URL` и `NEXT_PUBLIC_APP_URL` указывают на ваш Netlify URL

## 🔧 Конфигурация

### Supabase

1. Создайте проект на [Supabase](https://supabase.com/)
2. Получите URL и Anon Key из настроек проекта
3. Добавьте их в переменные окружения

### OpenAI / OpenRouter

- **OpenAI**: Получите API ключ на [platform.openai.com](https://platform.openai.com/)
- **OpenRouter**: Получите API ключ на [openrouter.ai](https://openrouter.ai/) (поддерживает множество моделей)

## 📁 Структура проекта

```
nebula_ai/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React компоненты
│   ├── lib/              # Утилиты и клиенты
│   ├── hooks/            # React хуки
│   ├── store/            # Zustand store
│   └── types/            # TypeScript типы
├── public/               # Статические файлы
├── netlify.toml          # Конфигурация Netlify
└── package.json          # Зависимости проекта
```

## 🛡️ Безопасность

- Никогда не коммитьте файлы `.env*` в Git
- Используйте переменные окружения для всех секретных ключей
- Настройте CORS в Supabase для вашего домена
- Регулярно обновляйте зависимости

## 📝 Лицензия

Этот проект является приватным.

## 🤝 Поддержка

При возникновении проблем:
1. Проверьте, что все переменные окружения установлены
2. Убедитесь, что Supabase проект настроен правильно
3. Проверьте логи в консоли браузера и Netlify

---

Создано с ❤️ используя Next.js, React и TypeScript
