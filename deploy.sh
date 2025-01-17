#!/bin/bash

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

# Создание SSL сертификата с помощью Certbot
sudo certbot --nginx -d ps-gold.kz -d www.ps-gold.kz --non-interactive --agree-tos --email viktor.rudi.wolf@gmail.com

# Копирование конфигурации Nginx
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
sudo nginx -t && sudo systemctl restart nginx

# Запуск Docker Compose
docker-compose down
docker-compose up -d --build

echo "Deployment completed successfully!"
