# Estágio de construção
FROM node:20.17-alpine3.19 AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .

# Estágio de desenvolvimento
# FROM build AS development
# WORKDIR /frontend
ENV NODE_ENV development
EXPOSE 3000
# VOLUME /app
CMD ["npm", "run", "dev"]