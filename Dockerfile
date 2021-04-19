FROM node:lts-alpine AS build
RUN apk update && apk add bash curl && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
RUN npm run build
RUN npm prune --production
RUN /usr/local/bin/node-prune
COPY . .

FROM node:lts-alpine
WORKDIR /home/node/app
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "./dist/server.js"]