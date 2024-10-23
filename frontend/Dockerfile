# usar uma imagem base com node
FROM node:20.17-alpine3.19 AS BASE

FROM base AS deps

# adiciona lib para compatibilidade devido ao 'musl'
RUN apk add --no-cache libc6-compat

# definir uma pasta padrao
WORKDIR /app

# copiar arquivos necessarios
COPY package*.json .

# instalar dependências
RUN npm ci

# copiar codigo
COPY . .

# executar aplicação
ENTRYPOINT [ "npm", "run", "build" ]

# imagem de produção
FROM base as production

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH "app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps app/public ./public

# permissões para usar corretamente o prerender do nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=deps /app/next.config.mjs ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static/

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# standalone output para não precisar usar todas as dependências
CMD ["node", "server.js"]

