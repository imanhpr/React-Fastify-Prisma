FROM node:alpine

RUN mkdir /reactapp

WORKDIR /reactapp

COPY . .

RUN npm i --loglevel vrbose

CMD npx live-server --port=5173 --host=0.0.0.0
