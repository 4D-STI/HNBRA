# usar uma imagem base com node
FROM node:20.17-alpine3.19 AS BASE

FROM base AS development

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

RUN npm run build

# executar aplicação
# CMD [ "npm", "run", "dev" ]

# imagem de produção
FROM base as production

WORKDIR /app
COPY --from=development /app/node_modules ./node_modules

COPY package*.json ./
RUN npm ci

COPY .  .

ENV NODE_ENV production
ENV NEXT_SHARP_PATH "app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=development app/public ./public

# permissões para usar corretamente o prerender do nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next


COPY --from=development /app/next.config.mjs ./
COPY --from=development --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=development --chown=nextjs:nodejs /app/.next/static ./.next/static/

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# standalone output para não precisar usar todas as dependências
CMD ["node", "server.js"]

