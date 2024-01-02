FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1912

RUN npm run build

CMD ["npm", "run", "production-start"]