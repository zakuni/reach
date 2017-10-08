FROM node:8-alpine

RUN adduser -D app
ENV HOME=/home/app

COPY package.json yarn.lock $HOME/reach/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/reach
RUN yarn

USER root
COPY . $HOME/reach
RUN chown -R app:app $HOME/*
USER app
RUN yarn run build

EXPOSE 3000
CMD ["node", "server.js"]
