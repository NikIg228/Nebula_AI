# ⚡ Быстрый старт для деплоя

## Шаг 1: Git репозиторий

```bash
# Если еще не инициализирован
git init
git add .
git commit -m "Initial commit"

# Подключите к GitHub
git remote add origin <ваш-github-url>
git push -u origin main
```

## Шаг 2: Netlify деплой

1. Зайдите на [netlify.com](https://www.netlify.com/)
2. "Add new site" → "Import from Git" → выберите GitHub
3. Выберите репозиторий `nebula_ai`
4. **Добавьте переменные окружения** (важно!):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` или `OPENROUTER_API_KEY`
5. Нажмите "Deploy site"

## Шаг 3: После деплоя

Обновите переменные окружения с URL вашего сайта:
- `OPENROUTER_SITE_URL=https://your-site.netlify.app`
- `NEXT_PUBLIC_APP_URL=https://your-site.netlify.app`

И передеплойте.

---

📖 Подробные инструкции: см. [DEPLOY.md](./DEPLOY.md)

