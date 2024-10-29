# Use a lightweight Node.js image as the base
FROM node:20.17-alpine3.19 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000

# Start the app
CMD ["node", "index.js"]