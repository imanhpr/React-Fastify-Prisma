FROM node

ENV NODE_ENV=production

RUN mkdir /myapp

WORKDIR /myapp

COPY package*.json /myapp/

RUN npm install --loglevel verbose

COPY ./dist /myapp/
COPY ./prisma prisma
COPY run.sh run.sh
# RUN npm run migrate
# RUN echo sleep for 5 sec && sleep 5
