#!/bin/bash

echo "Stopping containers..."
docker-compose down

echo "Building frontend..."
cd frontend
npm run build
cd ..

echo "Rebuilding and starting containers..."
docker-compose up -d --build

echo "Cleaning up..."
docker system prune -f

echo "Done! Check the logs with: docker-compose logs -f"
