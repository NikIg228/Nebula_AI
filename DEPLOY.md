# 🚀 Инструкция по деплою на Netlify

## Подготовка проекта

### 1. Инициализация Git (если еще не сделано)

```bash
# Проверьте статус Git
git status

# Если репозиторий не инициализирован
git init
git add .
git commit -m "Initial commit: Prepare for deployment"
```

### 2. Создание GitHub репозитория

1. Зайдите на [GitHub](https://github.com) и создайте новый репозиторий
2. Не добавляйте README, .gitignore или лицензию (они уже есть)
3. Скопируйте URL репозитория

### 3. Подключение к GitHub

```bash
# Добавьте remote репозиторий
git remote add origin <ваш-github-url>

# Или если remote уже существует, обновите его
git remote set-url origin <ваш-github-url>

# Отправьте код на GitHub
git branch -M main
git push -u origin main
```

## Деплой на Netlify

### Вариант 1: Через Netlify UI (Рекомендуется)

1. **Регистрация/Вход**
   - Зайдите на [netlify.com](https://www.netlify.com/)
   - Войдите или зарегистрируйтесь

2. **Подключение репозитория**
   - Нажмите "Add new site" → "Import an existing project"
   - Выберите "GitHub" (или другой Git-провайдер)
   - Авторизуйте Netlify для доступа к репозиториям
   - Выберите ваш репозиторий `nebula_ai`

3. **Настройки сборки**
   - Netlify автоматически определит настройки из `netlify.toml`
   - Убедитесь, что указано:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Если нужно, установите Node.js версию: `20`

4. **Переменные окружения**
   - Перед деплоем нажмите "Show advanced" → "New variable"
   - Добавьте все необходимые переменные:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
     OPENAI_API_KEY=your_openai_key (или OPENROUTER_API_KEY)
     ```
   - После первого деплоя обновите:
     ```
     OPENROUTER_SITE_URL=https://your-site.netlify.app
     NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
     ```

5. **Деплой**
   - Нажмите "Deploy site"
   - Дождитесь завершения сборки (обычно 2-5 минут)

### Вариант 2: Через Netlify CLI

1. **Установка CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Вход в Netlify**
   ```bash
   netlify login
   ```

3. **Инициализация проекта**
   ```bash
   netlify init
   ```
   - Выберите "Create & configure a new site"
   - Выберите команду сборки: `npm run build`
   - Укажите директорию публикации: `.next`

4. **Настройка переменных окружения**
   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_supabase_url"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_supabase_key"
   netlify env:set OPENAI_API_KEY "your_openai_key"
   # и т.д. для всех переменных
   ```

5. **Деплой**
   ```bash
   netlify deploy --prod
   ```

## После деплоя

### 1. Обновление переменных окружения

После первого деплоя получите URL вашего сайта (например: `https://nebula-ai-123.netlify.app`) и обновите:

```
OPENROUTER_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

Затем передеплойте сайт.

### 2. Настройка кастомного домена (опционально)

1. В Netlify перейдите в "Domain settings"
2. Нажмите "Add custom domain"
3. Следуйте инструкциям для настройки DNS

### 3. Настройка Supabase

1. В настройках Supabase проекта добавьте ваш Netlify URL в список разрешенных доменов
2. Настройте CORS, если необходимо

## Проверка деплоя

После успешного деплоя:

1. ✅ Откройте ваш сайт в браузере
2. ✅ Проверьте консоль браузера на наличие ошибок
3. ✅ Проверьте логи в Netlify Dashboard → "Deploys" → выберите деплой → "View deploy log"

## Решение проблем

### Ошибка сборки

- Проверьте логи в Netlify
- Убедитесь, что все переменные окружения установлены
- Проверьте версию Node.js (должна быть 20)

### Ошибки в рантайме

- Проверьте консоль браузера
- Убедитесь, что все `NEXT_PUBLIC_*` переменные установлены
- Проверьте, что Supabase URL и ключи правильные

### Проблемы с API

- Убедитесь, что API ключи действительны
- Проверьте лимиты API
- Убедитесь, что CORS настроен правильно

## Автоматический деплой

После подключения к GitHub, Netlify автоматически будет деплоить при каждом push в `main` ветку.

Для деплоя из других веток:
1. Перейдите в "Site settings" → "Build & deploy" → "Branch deploys"
2. Настройте правила для других веток

## Откат к предыдущей версии

1. В Netlify Dashboard перейдите в "Deploys"
2. Найдите нужный деплой
3. Нажмите "..." → "Publish deploy"

---

**Готово!** Ваш проект должен быть доступен по адресу `https://your-site.netlify.app`

