# DexRadar API (Vercel Serverless)

Минимальный API для Telegram Mini App. Два роута:
- `GET /api/new-pairs?minutes=30&minTvl=100000&networks=evm,solana` — выдаёт тестовые пары.
- `GET /api/auth/verify?initData=...` — верификация `tg.initData` по HMAC.

## Быстрый деплой на Vercel
1. Создай репозиторий `dexradar-api` на GitHub и залей сюда файлы.
2. В Vercel → **New Project** → выбери репозиторий → **Deploy**.
3. В проекте на Vercel открой **Settings → Environment Variables** и добавь:
   - `BOT_TOKEN` — токен твоего Telegram бота от @BotFather.
4. **Redeploy**.

## Проверка
- `GET https://<YOUR-API>.vercel.app/api/new-pairs`
- `GET https://<YOUR-API>.vercel.app/api/auth/verify?initData=<...>`

> `verify` принимает `initData` в `GET` (query) или `POST` (JSON { initData }).

