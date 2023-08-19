FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 1913
EXPOSE 1914

CMD ["npm", "start"]