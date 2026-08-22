FROM node:22.19.0 AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

COPY . .

RUN yarn build

FROM node:22.19.0 AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

CMD ["node", "dist/src/main.js"]
    