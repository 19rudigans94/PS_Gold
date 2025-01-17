FROM node:18-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

ENV NODE_OPTIONS="--max-old-space-size=250"

EXPOSE 3000

CMD ["npm", "start"]
