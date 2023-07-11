FROM node:15.5.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1912

CMD ["npm", "start"]