# Build stage
FROM node:18-slim AS build

# Оптимизируем память для Node.js
ENV NODE_OPTIONS="--max-old-space-size=512"

WORKDIR /app

# Копируем только файлы package для установки зависимостей
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
