FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 1913

CMD ["npm", "start"]