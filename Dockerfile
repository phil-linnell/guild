FROM ustwo/nodejs:4.1.1
MAINTAINER Phil Linnell <phil.linnell@gmail.com>

ENV NODE_ENV=production

RUN apk add --update \
      py-pip \
      git \
      make \
      g++ \
      tar \
 && pip install rethinkdb \
 && npm install -g npm \
 && mkdir -p /home/guild/logs \
 && rm -rf /var/cache/apk/*

COPY package.json /home/guild/package.json

WORKDIR /home/guild

RUN npm install

COPY src /home/guild/src


CMD ["npm", "start"]
