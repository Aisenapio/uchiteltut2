# Развертывание приложения uchiteltut2

Данная конфигурация предназначена для развертывания приложения с помощью Docker Compose.

## Структура

- `mongodb_teachers` - база данных MongoDB
- `server` - Node.js сервер с GraphQL API (порт 4000)
- `client` - React клиент (порт 3001)
- `nginx` - обратный прокси (порт 80)
- `tuna` - туннель для доступа из интернета (опционально)

## Требования

- Docker и Docker Compose
- Для туннеля: аккаунт на [tuna](https://tuna.uy) и токен

## Быстрый старт

1. Скопируйте файл `.env.example` в `.env` и настройте переменные окружения:
   ```bash
   cp .env.example .env
   ```
   Отредактируйте `.env`, установив `JWT_SECRET` и при необходимости `TUNA_TOKEN`.

2. Запустите приложение:
   ```bash
   docker-compose up -d
   ```

3. Приложение будет доступно по адресу http://localhost

4. Для остановки:
   ```bash
   docker-compose down
   ```

## Переменные окружения

### Обязательные
- `JWT_SECRET` - секретный ключ для JWT токенов

### Опциональные
- `TUNA_TOKEN` - токен для сервиса tuna (публичный URL)
- `TUNA_SUBDOMAIN` - субдомен для tuna (по умолчанию `teachers`)

### Автоматически настраиваемые
- `MONGODB_URI` - строка подключения к MongoDB
- `PORT` - порт сервера (4000)
- `VITE_API_URL` - URL GraphQL API для клиента
- `VITE_UPLOADS_URL` - URL для загрузки файлов

## Миграция данных

При первом запуске база данных будет пустой. Для заполнения тестовыми данными выполните:

```bash
docker-compose exec server npm run seed
```

## Мониторинг

- **Health check**: http://localhost/health
- **GraphQL API**: http://localhost/graphql
- **Загрузка файлов**: POST http://localhost/upload

## Настройка nginx

Конфигурация nginx находится в `nginx.conf`. По умолчанию:
- `/` → клиентское приложение (React)
- `/graphql` → GraphQL API
- `/upload` → эндпоинт загрузки файлов
- `/uploads/` → статические файлы

## Туннель (публичный доступ)

Если нужен публичный URL, раскомментируйте сервис `tuna` в docker-compose.yml и установите `TUNA_TOKEN`.

Приложение будет доступно по адресу: `https://teachers.tuna.uy`

## Обновление

1. Остановите приложение:
   ```bash
   docker-compose down
   ```

2. Обновите исходный код в папках `client` и `server`

3. Пересоберите образы:
   ```bash
   docker-compose build --no-cache
   ```

4. Запустите снова:
   ```bash
   docker-compose up -d
   ```

## Устранение неполадок

### Проверка логов
```bash
docker-compose logs -f
```

### Проверка состояния контейнеров
```bash
docker-compose ps
```

### Пересоздание контейнеров
```bash
docker-compose down -v
docker-compose up -d
```

## Резервное копирование

Данные MongoDB хранятся в томе `mongodb_data`. Для резервного копирования:

```bash
docker-compose exec mongodb_teachers mongodump --out /backup
```

## Безопасность

1. Измените пароль MongoDB в `docker-compose.yml`
2. Используйте сильный `JWT_SECRET`
3. Не используйте дефолтные пароли в production
4. Настройте HTTPS (нужен SSL сертификат)