# Архитектура StackCine Backend

## Обзор

Проект построен на **микросервисной архитектуре** с использованием **NestJS** и **gRPC** для межсервисной коммуникации. Все микросервисы взаимодействуют через Protobuf-контракты.

---

## Структура проекта

```
backend/
├── auth-service/        # Микросервис аутентификации и управления аккаунтами
├── gateway-service/     # API Gateway (единая точка входа)
├── contracts/           # Protobuf-контракты и сгенерированные типы
├── common/              # Общие утилиты и перечисления
├── passport/            # Библиотека аутентификации (кастомная реализация JWT)
└── core/                # Базовые конфигурации и общие настройки
```

---

## Библиотеки (Shared Libraries)

### 1. `@stackcine/contracts` 📦

**Назначение:** Централизованное хранилище Protobuf-контрактов и сгенерированных TypeScript-типов.

**Структура:**
```
contracts/
├── proto/              # .proto файлы с определениями gRPC сервисов
│   ├── auth.proto      # AuthService: SendOtp, VerifyOtp, Refresh
│   └── account.proto   # AccountService: GetAccount, Email/Phone change
├── gen/                # Сгенерированные TypeScript типы (ts-proto)
└── src/
    └── index.ts        # Экспорты контрактов
```

**Зачем нужна:**
- Единый источник истины для API всех микросервисов
- Типобезопасность при межсервисном взаимодействии
- Автоматическая генерация типов через `ts-proto`

**Использование:**
```typescript
import type { SendOtpRequest } from '@stackcine/contracts/gen/auth';
```

---

### 2. `@stackcine/common` 🛠️

**Назначение:** Общие утилиты, перечисления и вспомогательные функции.

**Структура:**
```
common/
├── lib/
│   ├── enums/
│   │   └── rpc-status.enum.ts   # gRPC статусы (OK, NOT_FOUND, etc.)
│   └── utils/
│       └── convert-enum.ts      # Утилиты для конвертации enum
└── index.ts
```

**Зачем нужна:**
- Централизованные gRPC статусы для обработки ошибок
- Общие утилиты для всех микросервисов

**Использование:**
```typescript
import { RpcStatus } from '@stackcine/common';
import { convertEnum } from '@stackcine/common';
```

---

### 3. `@stackcine/passport` 🔐

**Назначение:** Кастомная библиотека аутентификации с собственной реализацией токенов.

**Структура:**
```
passport/
├── lib/
│   ├── interfaces/
│   │   ├── passport-options.interface.ts
│   │   ├── token.interface.ts
│   │   └── index.ts
│   ├── constants/
│   │   └── passport.constants.ts
│   ├── utils/
│   │   ├── base64.ts      # Base64URL кодирование
│   │   └── crypto.ts      # HMAC-SHA256 подписи
│   ├── passport.module.ts
│   ├── passport.service.ts
│   └── index.ts
```

**Как работает:**
- Генерация токенов в формате: `userId.iat.exp.hmacSignature`
- Использование HMAC-SHA256 для подписи токенов
- Base64URL кодирование для каждой части токена
- Constant-time сравнение для защиты от timing-атак

**Формат токена:**
```
{base64(userId)}.{base64(iat)}.{base64(exp)}.{hmacSignature}
```

**Использование:**
```typescript
// Генерация токена
const token = passportService.generate(userId, ttl);

// Верификация токена
const result = passportService.verify(token);
// result: { valid: boolean, userId?: string, reason?: string }
```

---

### 4. `@stackcine/core` ⚙️

**Назначение:** Базовые конфигурации проекта (Prettier, ESLint).

**Структура:**
```
core/
└── src/
    └── prettier.config.mjs   # Конфигурация Prettier с сортировкой импортов
```

**Зачем нужна:**
- Единый стиль кода across all packages
- Экспорт конфигураций через package.json exports

---

## Auth-Service 🎯

**Назначение:** Микросервис управления аутентификацией и аккаунтами пользователей.

### Архитектура

```
auth-service/
├── src/
│   ├── config/              # Конфигурация приложения
│   │   ├── env/             # Переменные окружения
│   │   ├── loaders/         # Загрузчики конфигов (passport.config-loader.ts)
│   │   ├── validators/      # Валидаторы конфигов
│   │   └── interfaces/      # TypeScript интерфейсы конфигов
│   │
│   ├── infrastructure/      # Внешние зависимости
│   │   ├── grpc/            # gRPC сервер (grpc.server.ts, grpc.options.ts)
│   │   ├── prisma/          # Prisma ORM (prisma.module.ts, prisma.service.ts)
│   │   └── redis/           # Redis кэш/хранилище (redis.module.ts, redis.service.ts)
│   │
│   ├── modules/             # Бизнес-логика
│   │   ├── auth/            # Аутентификация
│   │   │   ├── auth.controller.ts   # gRPC контроллер (AuthService)
│   │   │   ├── auth.service.ts      # Бизнес-логика аутентификации
│   │   │   ├── auth.repository.ts   # Работа с БД (создание/обновление аккаунтов)
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── account/         # Управление аккаунтом
│   │   │   ├── account.controller.ts
│   │   │   ├── account.service.ts
│   │   │   ├── account.repository.ts
│   │   │   └── account.module.ts
│   │   │
│   │   └── otp/             # OTP (One-Time Password)
│   │       ├── otp.service.ts       # Генерация/верификация OTP кодов
│   │       └── otp.module.ts
│   │
│   ├── shared/              # Общие компоненты внутри сервиса
│   │   ├── repositories/
│   │   │   ├── user.repository.ts   # Поиск пользователей (findByEmail, findByPhone)
│   │   │   └── index.ts
│   │   └── utils/
│   │
│   ├── app.module.ts        # Корневой модуль
│   └── main.ts              # Точка входа
│
└── prisma/
    └── schema.prisma        # Схема БД (модель Account)
```

### Поток аутентификации

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│  gRPC Gate   │────▶│ Auth-Service│
│             │◀────│              │◀────│             │
└─────────────┘     └──────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
            ┌───────────────┐         ┌───────────────┐         ┌───────────────┐
            │    Prisma     │         │     Redis     │         │   Passport    │
            │  (PostgreSQL) │         │   (OTP Cache) │         │   (Tokens)    │
            └───────────────┘         └───────────────┘         └───────────────┘
```

### gRPC Сервисы

#### AuthService (`auth.v1`)

| Метод | Описание |
|-------|----------|
| `SendOtp` | Отправка OTP кода (email/phone). Создаёт аккаунт если не существует |
| `VerifyOtp` | Верификация OTP кода. Возвращает access/refresh токены |
| `Refresh` | Обновление access токена по refresh токену |

#### AccountService (`account.v1`)

| Метод | Описание |
|-------|----------|
| `GetAccount` | Получение данных аккаунта по ID |
| `InitEmailChange` | Инициализация смены email |
| `ConfirmEmailChange` | Подтверждение смены email |
| `InitPhoneChange` | Инициализация смены телефона |
| `ConfirmPhoneChange` | Подтверждение смены телефона |

### Модель данных (Prisma)

```prisma
model Account {
  id              String   @id @default(uuid())
  phone           String?  @unique
  email           String?  @unique
  isPhoneVerified Boolean  @default(false)
  isEmailVerified Boolean  @default(false)
  role            Role     @default(USER)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

### Ключевые зависимости

| Зависимость | Назначение |
|-------------|------------|
| `@nestjs/common` | Фреймворк NestJS |
| `@nestjs/microservices` | gRPC транспорт |
| `@prisma/client` | ORM для работы с БД |
| `ioredis` | Redis клиент для OTP кэша |
| `patcode` | Генерация OTP кодов |
| `@stackcine/*` | Внутренние библиотеки |

---

## Межсервисное взаимодействие

```
┌─────────────────┐         ┌─────────────────┐
│ Gateway Service │────────▶│  Auth Service   │
│   (API Gate)    │  gRPC   │                 │
│                 │◀────────│                 │
└─────────────────┘         └─────────────────┘
         │
         │ gRPC
         ▼
┌─────────────────┐
│ Other Services  │
│   (future)      │
└─────────────────┘
```

Все сервисы общаются через **gRPC** с использованием **Protobuf** контрактов из `@stackcine/contracts`.

---

## Безопасность

1. **OTP коды:**
   - Хранятся в Redis в виде SHA256 хэша
   - TTL: 5 минут (300 секунд)
   - Ключ формата: `otp:{type}:{identifier}`

2. **Токены:**
   - Кастомная реализация на HMAC-SHA256
   - Формат: `userId.iat.exp.signature`
   - Constant-time сравнение подписей
   - Раздельные TTL для access/refresh токенов

3. **Защита от атак:**
   - Timing-атаки: constant-time equal
   - Replay-атаки: одноразовые OTP коды
   - Подделка токенов: HMAC подпись

---

## Развертывание

### Локальный запуск auth-service:

```bash
cd auth-service
yarn install
yarn prisma generate
yarn start:dev
```

### Генерация контрактов:

```bash
cd contracts
yarn generate  # protoc → TypeScript типы
yarn build
```

### Публикация библиотек:

```bash
cd contracts && npm publish  # @stackcine/contracts
cd common && npm publish     # @stackcine/common
cd passport && npm publish   # @stackcine/passport
cd core && npm publish       # @stackcine/core
```

---

## Расширение архитектуры

### Добавление нового микросервиса:

1. Создать папку сервиса (например, `payment-service/`)
2. Добавить `.proto` файл в `contracts/proto/`
3. Сгенерировать типы: `yarn generate` в `contracts/`
4. Опубликовать: `npm publish` в `contracts/`
5. Установить `@stackcine/contracts` в новый сервис
6. Реализовать gRPC контроллер

### Добавление нового gRPC метода:

1. Обновить `.proto` файл в `contracts/proto/`
2. Запустить `yarn generate`
3. Опубликовать новую версию `@stackcine/contracts`
4. Обновить сервисы

---

## Стек технологий

| Категория | Технологии |
|-----------|------------|
| Фреймворк | NestJS 11 |
| Язык | TypeScript 5.9 |
| RPC | gRPC + Protobuf |
| БД | PostgreSQL + Prisma ORM |
| Кэш | Redis (ioredis) |
| Аутентификация | Кастомная (HMAC-SHA256) |
| Пакетный менеджер | Yarn |
| Линтинг | ESLint + Prettier |

---

## Контакты

**StackForge** - stackforge@proton.me
