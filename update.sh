#!/bin/bash

echo "Stopping containers..."
docker-compose down

echo "Cleaning up before build..."
docker system prune -f
docker builder prune -f

echo "Building frontend..."
cd frontend
# Оптимизируем память для локальной сборки
export NODE_OPTIONS="--max-old-space-size=512"
export NODE_ENV=production
# Устанавливаем все зависимости, включая dev-зависимости для сборки
npm ci
npm run build
cd ..

echo "Rebuilding and starting containers..."
docker-compose up -d --build

echo "Cleaning up..."
docker system prune -f
docker builder prune -f

echo "Done! Check the logs with: docker-compose logs -f"
