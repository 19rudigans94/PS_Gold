#!/bin/bash

# Остановка и удаление существующих контейнеров
echo "Stopping and removing existing containers..."
docker-compose down

# Очистка неиспользуемых образов и томов
echo "Cleaning up unused images and volumes..."
docker system prune -f

# Обновление системы
sudo apt-get update
sudo apt-get upgrade -y

# Установка необходимых пакетов
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    nginx \
    certbot \
    python3-certbot-nginx

# Установка Docker если его нет
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
fi

# Установка Docker Compose если его нет
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Создание необходимых директорий
echo "Creating required directories..."
mkdir -p nginx/ssl
mkdir -p backend/prisma
mkdir -p frontend/dist

# Проверка наличия .env файла
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "JWT_SECRET=$(openssl rand -hex 32)" > .env
    echo "COOKIE_SECRET=$(openssl rand -hex 32)" >> .env
fi

# Генерация SSL-сертификатов (если нужно)
if [ ! -f nginx/ssl/ps-gold.kz.crt ]; then
    echo "Generating self-signed SSL certificate..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/ps-gold.kz.key \
        -out nginx/ssl/ps-gold.kz.crt \
        -subj "/C=KZ/ST=Almaty/L=Almaty/O=PS Gold/CN=ps-gold.kz"
fi

# Установка правильных прав доступа
echo "Setting correct permissions..."
chmod -R 755 .
chmod 600 .env
chmod 600 nginx/ssl/*

# Копирование конфигурации Nginx
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
sudo nginx -t && sudo systemctl restart nginx

# Сборка и запуск контейнеров
echo "Building and starting containers..."
docker-compose up -d --build

# Проверка статуса контейнеров
echo "Checking container status..."
docker-compose ps

echo "Deployment completed!"
