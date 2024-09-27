# usar uma imagem base com node
FROM node:20.17-alpine3.19

# definir uma pasta padrao
WORKDIR /app

# copiar arquivos necessarios
COPY package*.json .

# instalar dependências
RUN npm ci

# copiar codigo
COPY . .

# executar aplicação
CMD ["npm", "start"]