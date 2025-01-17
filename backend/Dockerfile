FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
ENV NODE_OPTIONS="--max-old-space-size=500"
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
