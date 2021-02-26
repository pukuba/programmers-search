FROM node:14

RUN mkdir -p /server

WORKDIR /server

ADD ./ /server

RUN npm install

RUN npm run init

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]