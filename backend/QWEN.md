# StackCine Backend — Context Guide

## Project Overview

**StackCine Backend** is a microservices-based backend system built with **NestJS 11** and **TypeScript 5.9**. The architecture uses **gRPC** with **Protobuf** contracts for inter-service communication. The project follows a modular monorepo structure with shared libraries published as npm packages.

### Architecture Summary

```
backend/
├── auth-service/        # Authentication & account management microservice (gRPC)
├── gateway-service/     # API Gateway (HTTP entry point with Swagger docs)
├── contracts/           # Protobuf definitions & generated TypeScript types
├── common/              # Shared utilities & enums (gRPC status codes)
├── passport/            # Custom JWT-like authentication library (HMAC-SHA256)
├── core/                # Base configurations (Prettier, ESLint)
└── docker/              # Docker Compose for local development (PostgreSQL, Redis)
```

### Key Technologies

| Category | Technology |
|----------|------------|
| Framework | NestJS 11 |
| Language | TypeScript 5.9 |
| RPC | gRPC + Protobuf (ts-proto) |
| Database | PostgreSQL 17 + Prisma ORM 7 |
| Cache | Redis 8.4 (ioredis) |
| Auth | Custom HMAC-SHA256 tokens |
| Package Manager | Yarn |
| Linting | ESLint 9 + Prettier 3 |

---

## Building and Running

### Prerequisites

- Node.js 18+
- Yarn (`npm install -g yarn`)
- Docker & Docker Compose (for local infrastructure)
- Protobuf compiler (`protoc`) for contract generation

### Infrastructure Setup

Start PostgreSQL and Redis locally:

```bash
cd docker
docker-compose up -d
```

This starts:
- **PostgreSQL** on port `5433` (user/pass from `.env`)
- **Redis** on port `6379` (password from `.env`)
- **Redis Insight** on port `5540` (UI for Redis)

### Auth Service

```bash
cd auth-service

# Install dependencies
yarn install

# Generate Prisma client
yarn prisma generate

# Run database migrations
yarn prisma migrate dev

# Development mode
yarn start:dev

# Production build
yarn build && yarn start:prod
```

### Gateway Service

```bash
cd gateway-service

# Install dependencies
yarn install

# Development mode
yarn start:dev

# Access Swagger docs at http://localhost:3000/docs
```

### Building Shared Libraries

```bash
# Generate TypeScript types from .proto files
cd contracts
yarn generate
yarn build

# Build other shared packages
cd common && yarn build
cd passport && yarn build
cd core && yarn build
```

### Running Tests

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

---

## Development Conventions

### Code Style

- **Prettier**: Configured with `@trivago/prettier-plugin-sort-imports` for import sorting
- **ESLint**: Using `typescript-eslint` with NestJS recommended rules
- **Format command**: `yarn format` runs Prettier on all `.ts` files

### Project Structure Conventions

Each service follows this pattern:

```
service-name/
├── src/
│   ├── config/              # Environment config loaders & validators
│   ├── infrastructure/      # External deps (gRPC, Prisma, Redis)
│   ├── modules/             # Business logic (controllers, services, repositories)
│   ├── shared/              # Internal shared utilities
│   ├── app.module.ts        # Root module
│   └── main.ts              # Entry point
```

### Module Pattern

Modules use the **controller-service-repository** pattern:

```typescript
// Controller: gRPC/HTTP request handling
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
}

// Service: Business logic
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private otpService: OtpService,
    private passportService: PassportService,
  ) {}
}

// Repository: Database access
@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}
}
```

### gRPC Contracts

All inter-service communication uses Protobuf contracts:

1. Define service in `contracts/proto/*.proto`
2. Generate types: `cd contracts && yarn generate`
3. Publish: `cd contracts && npm publish`
4. Use in services: `import { ... } from '@stackcine/contracts/gen/auth'`

### Token Format (Custom Auth)

Tokens use a custom HMAC-SHA256 format (not standard JWT):

```
{base64(userId)}.{base64(iat)}.{base64(exp)}.{hmacSignature}
```

Generated via `@stackcine/passport` library with constant-time comparison for security.

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `contracts/proto/auth.proto` | AuthService gRPC definitions (SendOtp, VerifyOtp, Refresh) |
| `contracts/proto/account.proto` | AccountService gRPC definitions (GetAccount, Email/Phone changes) |
| `auth-service/prisma/schema.prisma` | Database schema (Account model) |
| `auth-service/src/infrastructure/grpc/grpc.server.ts` | gRPC server configuration |
| `gateway-service/src/core/config/cors.config.ts` | CORS configuration for gateway |
| `docker/docker-compose.yml` | Local infrastructure (PostgreSQL, Redis) |
| `docker/.env` | Environment variables for Docker services |

---

## Common Tasks

### Add New gRPC Method

1. Edit `.proto` file in `contracts/proto/`
2. Run `cd contracts && yarn generate`
3. Run `cd contracts && yarn build && npm publish`
4. Update service version in `package.json` to use new contract version
5. Implement controller method in service

### Add New Microservice

1. Create service folder: `mkdir new-service && cd new-service`
2. Initialize NestJS: `npx @nestjs/cli new .`
3. Add `.proto` definitions to `contracts/proto/`
4. Generate & publish contracts
5. Install `@stackcine/contracts` in new service
6. Implement gRPC controller

### Database Migration

```bash
cd auth-service

# Create new migration
yarn prisma migrate dev --name description

# Reset database (dev only)
yarn prisma migrate reset

# Generate Prisma client
yarn prisma generate
```

---

## Environment Variables

### Auth Service

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` | Redis connection |
| `GRPC_PORT`, `GRPC_HOST` | gRPC server binding |
| `PASSPORT_SECRET` | Token signing secret |
| `PASSPORT_TTL_ACCESS`, `PASSPORT_TTL_REFRESH` | Token TTL in seconds |

### Gateway Service

| Variable | Description |
|----------|-------------|
| `HTTP_PORT`, `HTTP_HOST` | HTTP server binding |
| `COOKIES_SECRET` | Cookie signing secret |
| `AUTH_GRPC_URL` | Auth service gRPC endpoint |

---

## Troubleshooting

### gRPC Connection Issues

Ensure auth-service is running and gRPC port is accessible:
```bash
# Check gRPC server is listening
netstat -an | grep 50051  # default gRPC port
```

### Prisma Client Not Generated

```bash
cd auth-service
yarn prisma generate
```

### Contract Type Mismatch

Regenerate types after proto changes:
```bash
cd contracts
yarn generate
yarn build
npm publish
```

---

## Additional Resources

- [Architecture Documentation](./@qwen(explanation)/ARCHITECTURE/README.md)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [gRPC Documentation](https://grpc.io/docs)
