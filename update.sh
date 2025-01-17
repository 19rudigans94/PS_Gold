#!/bin/bash

echo "Stopping containers..."
docker-compose down

echo "Cleaning up Docker..."
docker system prune -f
docker builder prune -f

echo "Starting containers..."
COMPOSE_HTTP_TIMEOUT=300 docker-compose up -d --build

echo "Done! Check the logs with: docker-compose logs -f"
