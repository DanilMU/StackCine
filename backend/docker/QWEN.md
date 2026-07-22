# Docker Infrastructure

## Overview

Директория `docker/` содержит Docker Compose конфигурацию для запуска всей необходимой инфраструктуры StackCine backend.

## docker-compose.yml

### Services

| Service | Image | Ports | Purpose |
|---------|-------|-------|---------|
| **PostgreSQL** | postgres:17 | 5433:5432 | БД для auth-service (Prisma) |
| **Redis** | redis:8.4 | 6379:6379 | OTP cache, сессии |
| **Redis Insight** | redis/redisinsight:latest | 5540:5540 | Redis admin UI |
| **RabbitMQ** | rabbitmq:3-management | 5672 (AMQP), 15672 (mgmt UI) | Message broker |

### Network

Все сервисы находятся в сети `stackcine` (bridge driver).

## Credentials (.env)

| Service | Username | Password |
|---------|----------|----------|
| PostgreSQL | postgres | 123456 |
| Redis | - | 123456 |
| RabbitMQ | guest | 123456 |

## Building and Running

```bash
# Start all infrastructure services
cd docker
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (caution: deletes data!)
docker-compose down -v
```

## Service Details

### PostgreSQL (5433)
- Used by auth-service via Prisma ORM
- Connection string: `postgresql://postgres:123456@localhost:5433/stackcine_auth`
- Default database: create manually or via Prisma

### Redis (6379)
- OTP codes storage (TTL 5 min)
- Session storage
- Connection: `redis://:123456@localhost:6379`

### Redis Insight (5540)
- Web UI for Redis management
- Access: http://localhost:5540
- Add connection: `redis:6379` with password `123456`

### RabbitMQ (5672, 15672)
- **5672**: AMQP protocol port (for services)
- **15672**: Management UI
- Management UI: http://localhost:15672
- Login: `guest` / `123456`
- Queue for notifications: configured in auth-service env

## Environment Variables for Services

### auth-service
```env
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=123456
DATABASE_NAME=stackcine_auth

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=123456

RMQ_URL=amqp://guest:123456@localhost:5672
```

### notification-service
```env
RMQ_URL=amqp://guest:123456@localhost:5672
RMQ_QUEUE=notifications
```

## Troubleshooting

### Port Conflicts
- PostgreSQL on 5433 (not default 5432) to avoid conflicts
- Check port availability: `netstat -ano | findstr <port>`

### RabbitMQ Connection Issues
- Ensure RabbitMQ is fully started (management UI accessible)
- Default guest user only works from localhost

### Redis Authentication
- Redis requires password `123456`
- Check connection string includes password

## Adding New Infrastructure

1. Add service to `docker-compose.yml`
2. Add credentials to `.env`
3. Update service env vars in application .env files
4. Document in this file
