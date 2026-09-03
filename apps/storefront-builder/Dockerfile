FROM node:22-slim AS base

# Stage 1 - install deps
FROM base AS deps
WORKDIR /app

COPY package*.json  ./
COPY apps/storefront-builder/package*.json  ./apps/storefront-builder/

RUN npm ci

# Stage 2 - build
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_DOMAIN
ARG NEXT_PUBLIC_WEB_DOMAIN
ARG NEXT_PUBLIC_OTP_TOKEN
ARG NEXT_PUBLIC_OTP_WIDGET_ID
ARG NEXT_PUBLIC_ST_CONNECTION_URL
ARG NEXT_PUBLIC_BRAND_DOMAIN

ENV NEXT_PUBLIC_API_DOMAIN=$NEXT_PUBLIC_API_DOMAIN
ENV NEXT_PUBLIC_WEB_DOMAIN=$NEXT_PUBLIC_WEB_DOMAIN
ENV NEXT_PUBLIC_OTP_TOKEN=$NEXT_PUBLIC_OTP_TOKEN
ENV NEXT_PUBLIC_OTP_WIDGET_ID=$NEXT_PUBLIC_OTP_WIDGET_ID
ENV NEXT_PUBLIC_ST_CONNECTION_URL=$NEXT_PUBLIC_ST_CONNECTION_URL
ENV NEXT_PUBLIC_BRAND_DOMAIN=$NEXT_PUBLIC_BRAND_DOMAIN

RUN mkdir -p apps/storefront-builder/public

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build:sfb

# Stage 3 - run
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy public files
COPY --from=builder /app/apps/storefront-builder/public ./apps/storefront-builder/public
# Copy env
COPY --from=builder /app/apps/storefront-builder/.env ./.env
# Copy standalone next server
COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront-builder/.next/standalone ./apps/storefront-builder/
# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront-builder/.next/static ./apps/storefront-builder/.next/static
# Copy full node_modules (optional, ensures all deps available)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 8000

CMD ["node", "./apps/storefront-builder/server.js"]
