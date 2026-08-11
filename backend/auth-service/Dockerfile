FROM node:22.19.0 AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM node:22.19.0 AS runner

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

CMD ["node", "dist/src/main.js"]
