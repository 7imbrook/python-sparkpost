FROM node:7.4

WORKDIR /app
COPY ./package.json /app/package.json
RUN npm install

COPY ./ /app
EXPOSE 3000

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT /entrypoint.sh
