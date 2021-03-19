FROM node:15.8.0-alpine3.10

WORKDIR /usr/src/app

# COPY ./.next /usr/src/app/
COPY ./ /usr/src/app/

RUN npm install --production
RUN npm run build

EXPOSE 3000