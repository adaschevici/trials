FROM node:alpine

WORKDIR /app

RUN npm install -g nodemon

ADD package.json package-lock.json ./
RUN npm install

CMD ["nodemon", "src/server.js"]
