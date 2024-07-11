FROM node:21 AS builder
LABEL authors="kigawa"
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY app ./app
COPY public ./public
COPY tsconfig.json ./
COPY next.config.js ./
COPY ./.eslintrc.json ./
COPY ./postcss.config.mjs ./
COPY ./tailwind.config.ts ./
ARG apiUrl

RUN echo NEXT_PUBLIC_BASE_URL="$apiUrl" >> ./.env
RUN npm run build


FROM node:21 AS runner
WORKDIR /standalone
COPY --from=builder /app/next.config.js /standalone
COPY --from=builder /app/.next/standalone /standalone
COPY --from=builder /app/.next/static /standalone/.next/static
COPY --from=builder /app/public /standalone/public
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
USER nextjs
ENV PORT=3000
EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]