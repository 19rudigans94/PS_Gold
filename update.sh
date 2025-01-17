#!/bin/bash

# Создаем временный swap-файл для сборки
echo "Setting up temporary swap file..."
sudo swapoff -a
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

echo "Stopping containers..."
docker-compose down

echo "Cleaning up before build..."
docker system prune -f
docker builder prune -f

# Очищаем node_modules для чистой установки
echo "Cleaning node_modules..."
rm -rf frontend/node_modules
rm -rf frontend/dist

echo "Building frontend..."
cd frontend
# Оптимизируем память для локальной сборки
export NODE_OPTIONS="--max-old-space-size=512"
export NODE_ENV=production
# Устанавливаем все зависимости, включая dev-зависимости для сборки
npm ci
npm run build
cd ..

echo "Building and starting containers..."
# Увеличиваем время ожидания для сборки
COMPOSE_HTTP_TIMEOUT=300 docker-compose up -d --build

echo "Cleaning up..."
docker system prune -f
docker builder prune -f

# Удаляем временный swap-файл
echo "Removing temporary swap file..."
sudo swapoff /swapfile
sudo rm /swapfile

echo "Done! Check the logs with: docker-compose logs -f"
