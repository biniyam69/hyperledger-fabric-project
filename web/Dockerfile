FROM node:14.15.0-stretch

ENV NODE_ENV production
ENV PORT 3000
ENV DOCKER_SOCKET_PATH /host/var/run/docker.sock
ENV DOCKER_CCENV_IMAGE hyperledger/fabric-ccenv:latest

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm i && npm i --only=dev \
&& npm run build \
&& npm prune

EXPOSE 3000
CMD ["npm", "run", "serve"]
