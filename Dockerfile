# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma Client 생성
RUN npx prisma generate

# Next.js 앱 빌드
RUN npm run build

# 2. Run Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 복사 (next.config.mjs 포함)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["npm", "start"]