# Инструкция по развертыванию

## Предварительные требования

- Ubuntu Server 22.04 LTS
- Доступ по SSH к серверу
- Домен ps-gold.kz, направленный на IP 185.4.180.115
- Docker и Docker Compose
- Certbot для SSL-сертификатов

## Подготовка сервера

1. Подключитесь к серверу:
```bash
ssh root@185.4.180.115
```

2. Установите необходимые пакеты:
```bash
apt update && apt upgrade -y
apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx git
```

3. Получите SSL-сертификаты:
```bash
certbot certonly --nginx -d ps-gold.kz -d www.ps-gold.kz
```

## Развертывание приложения

1. Создайте директорию и клонируйте репозиторий:
```bash
mkdir -p /opt/ps-gold
cd /opt/ps-gold
git clone [URL_РЕПОЗИТОРИЯ] .
```

2. Настройте переменные окружения:
```bash
# Создайте файл .env
cat > .env << EOL
NODE_ENV=production
MONGODB_URI=mongodb://mongodb:27017/ps-gold
JWT_SECRET=your_secure_jwt_secret
COOKIE_SECRET=your_secure_cookie_secret
EOL
```

3. Настройте права доступа:
```bash
# Для SSL-сертификатов
mkdir -p /etc/nginx/ssl
chmod -R 755 /etc/nginx/ssl
```

4. Сделайте скрипт обновления исполняемым:
```bash
chmod +x update.sh
```

## Запуск приложения

1. Запустите приложение:
```bash
./update.sh
```

2. Проверьте статус контейнеров:
```bash
docker-compose ps
```

## Обновление приложения

1. Получите последние изменения:
```bash
git pull
```

2. Запустите скрипт обновления:
```bash
./update.sh
```

## Мониторинг и обслуживание

### Просмотр логов
```bash
# Логи всех контейнеров
docker-compose logs -f

# Логи конкретного контейнера
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Резервное копирование базы данных
```bash
# Создание бэкапа
docker exec mongodb mongodump --out /dump
docker cp mongodb:/dump ./backup

# Восстановление из бэкапа
docker cp ./backup mongodb:/dump
docker exec mongodb mongorestore /dump
```

### Обновление SSL-сертификатов

Сертификаты обновляются автоматически через Certbot. Для ручного обновления:
```bash
certbot renew
```

## Проверка работоспособности

1. Проверьте доступность сайта:
   - Frontend: https://ps-gold.kz
   - API: https://ps-gold.kz/api

2. Проверьте SSL-сертификат:
```bash
curl -vI https://ps-gold.kz
```

## Устранение неполадок

1. Если контейнеры не запускаются:
```bash
# Проверьте логи
docker-compose logs

# Перезапустите с очисткой
docker-compose down
docker system prune -f
docker-compose up -d --build
```

2. Если проблемы с SSL:
```bash
# Проверьте права доступа
ls -la /etc/letsencrypt/live/ps-gold.kz/
ls -la /etc/nginx/ssl/

# Проверьте конфигурацию Nginx
nginx -t
```

## Безопасность

- Все секретные данные хранятся в `.env`
- SSL-сертификаты от Let's Encrypt с автообновлением
- Настроен HTTPS с автоматическим редиректом с HTTP
- Настроены заголовки безопасности в Nginx

## Полезные команды

```bash
# Перезапуск всех контейнеров
docker-compose restart

# Очистка неиспользуемых Docker ресурсов
docker system prune -f

# Проверка использования диска
docker system df
