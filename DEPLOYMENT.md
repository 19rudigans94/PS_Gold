# Инструкция по развертыванию

## Предварительные требования

- Ubuntu Server (последняя версия)
- Доступ по SSH к серверу
- Домен ps-gold.kz, направленный на IP 185.4.180.115

## Шаги по развертыванию

1. Подключитесь к серверу по SSH:
```bash
ssh user@185.4.180.115
```

2. Клонируйте репозиторий:
```bash
cd /opt/ps-gold
```

3. Настройте переменные окружения:
```bash
# Создайте файл .env в корневой директории
nano .env

# Добавьте следующие переменные (замените значения на свои):
NODE_ENV=production
MONGODB_URI=mongodb://mongodb:27017/ps-gold
JWT_SECRET=your_secure_jwt_secret
COOKIE_SECRET=your_secure_cookie_secret
```

4. Сделайте скрипт развертывания исполняемым:
```bash
chmod +x deploy.sh
```

5. Запустите скрипт развертывания:
```bash
./deploy.sh
```

## Проверка развертывания

1. Проверьте статус контейнеров:
```bash
docker-compose ps
```

2. Проверьте логи:
```bash
# Для фронтенда
docker logs ps-gold-frontend

# Для бэкенда
docker logs ps-gold-backend

# Для MongoDB
docker logs ps-gold-mongodb
```

3. Проверьте доступность сайта:
- Фронтенд: https://ps-gold.kz
- API: https://ps-gold.kz/api

## Обновление приложения

Для обновления приложения выполните:
```bash
git pull
docker-compose down
docker-compose up -d --build
```

## Резервное копирование

База данных автоматически сохраняется в Docker volume. Для создания резервной копии:
```bash
docker exec ps-gold-mongodb mongodump --out /dump
docker cp ps-gold-mongodb:/dump ./backup
```

## Мониторинг

- Логи Nginx: `/var/log/nginx/`
- Логи Docker: `docker logs [container-name]`
- Статус сервисов: `docker-compose ps`

## Безопасность

- Все секретные ключи хранятся в переменных окружения
- SSL-сертификаты автоматически обновляются через Certbot
- Настроены базовые заголовки безопасности в Nginx
- Настроен HTTPS с редиректом с HTTP
