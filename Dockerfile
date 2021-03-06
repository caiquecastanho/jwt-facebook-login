FROM node:10.5-alpine

WORKDIR /var/app

ENV NODE_ENV=production

COPY package.json /var/app/

RUN npm install

ADD ./ /var/app/

EXPOSE 3000

CMD ["npm", "start"]