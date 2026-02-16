FROM node:22-alpine

WORKDIR /var/www/frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
