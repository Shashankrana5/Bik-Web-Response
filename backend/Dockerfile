FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1913

CMD ["npm", "start"]