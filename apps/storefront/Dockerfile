FROM node:22-slim AS base

# Stage 1 - install deps
FROM base AS deps
WORKDIR /app

COPY package*.json  ./
COPY apps/storefront/package.json  ./apps/storefront/

RUN npm ci

# State 2 - build
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_DOMAIN
ARG NEXT_PUBLIC_WEB_DOMAIN
ARG NEXT_PUBLIC_OTP_TOKEN
ARG NEXT_PUBLIC_OTP_WIDGET_ID
ARG NEXT_PUBLIC_MIXPANEL_TOKEN
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_RAZORPAY_KEY_ID
ARG NEXT_PUBLIC_ST_CONNECTION_URL
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_PREPROD_BASE_DOMAIN

ENV NEXT_PUBLIC_API_DOMAIN=$NEXT_PUBLIC_API_DOMAIN
ENV NEXT_PUBLIC_WEB_DOMAIN=$NEXT_PUBLIC_WEB_DOMAIN
ENV NEXT_PUBLIC_OTP_TOKEN=$NEXT_PUBLIC_OTP_TOKEN
ENV NEXT_PUBLIC_OTP_WIDGET_ID=$NEXT_PUBLIC_OTP_WIDGET_ID
ENV NEXT_PUBLIC_MIXPANEL_TOKEN=$NEXT_PUBLIC_MIXPANEL_TOKEN
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=$NEXT_PUBLIC_RAZORPAY_KEY_ID
ENV NEXT_PUBLIC_ST_CONNECTION_URL=$NEXT_PUBLIC_ST_CONNECTION_URL
ENV NEXT_PUBLIC_ENVIRONMENT=$NEXT_PUBLIC_ENVIRONMENT
ENV NEXT_PUBLIC_PREPROD_BASE_DOMAIN=$NEXT_PUBLIC_PREPROD_BASE_DOMAIN

RUN mkdir -p apps/storefront/public

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build:sf

# Stage 3 - run
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/apps/storefront/public ./apps/storefront/public
COPY --from=builder /app/apps/storefront/.env ./.env
COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront/.next/static ./apps/storefront/.next/static
COPY --chown=nextjs:nodejs apps/storefront/src/middleware.ts ./middleware.ts

USER nextjs

EXPOSE 5000

CMD ["node", "./apps/storefront/server.js"]