# Build stage
FROM node:18-slim as build

# Оптимизируем память для Node.js
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies для сборки
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
