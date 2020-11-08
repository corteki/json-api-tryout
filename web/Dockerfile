FROM node:14
WORKDIR /usr/src/app
COPY package*.json .
COPY .env .
COPY ormconfig.js .
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run run:build