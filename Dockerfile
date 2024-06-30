FROM node:21 AS builder
LABEL authors="kigawa"
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
#COPY api_clients ./api_clients
COPY app ./app
#COPY assets ./assets
COPY tsconfig.json ./
COPY next.config.js ./
ARG apiUrl

RUN echo NEXT_PUBLIC_BASE_URL="$apiUrl" >> ./.env
RUN npm run build


FROM node:21 AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]