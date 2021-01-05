FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i

COPY . /usr/src/app

EXPOSE 3333

CMD [ "npm", "start" ]